// db/migrate.ts
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { pool } from './db.js';
interface Migration {
  name: string;
  checksum: string;
}

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.error('✗ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  const client = await pool.connect();

  try {
    console.log('🔄 Starting database migrations...\n');

    // Ensure migrations tracking table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMP DEFAULT NOW(),
        sql_text TEXT NOT NULL,
        checksum VARCHAR(64) NOT NULL
      )
    `);
    console.log('✓ Migrations table ready\n');

    // Get already applied migrations
    const { rows: applied } = await client.query<Migration>(
      'SELECT name, checksum FROM schema_migrations ORDER BY id',
    );

    const appliedMap = new Map(applied.map((r) => [r.name, r.checksum]));

    console.log(appliedMap);

    // Find migrations directory
    const migrationsDir = path.join(path.resolve(), 'src', 'db', 'migrations');

    if (!fs.existsSync(migrationsDir)) {
      console.error('✗ Migrations directory not found at:', migrationsDir);
      console.error('Create it with: mkdir -p db/migrations');
      process.exit(1);
    }

    // Get all SQL files
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('⚠ No migration files found in', migrationsDir);
      console.log(
        'Create your first migration: db/migrations/001_create_users.sql',
      );
      return;
    }

    console.log(`Found ${files.length} migration file(s)\n`);

    let appliedCount = 0;
    let skippedCount = 0;

    // Process each migration
    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8').trim();

      if (!sql) {
        console.log(`⊘ ${file} (empty file, skipping)`);
        continue;
      }

      const checksum = crypto.createHash('sha256').update(sql).digest('hex');

      // Check if already applied
      if (appliedMap.has(file)) {
        const existingChecksum = appliedMap.get(file);

        // Verify file hasn't been modified
        if (existingChecksum !== checksum) {
          console.error(
            `\n✗ CRITICAL ERROR: Migration ${file} has been modified!`,
          );
          console.error('   Original checksum:', existingChecksum);
          console.error('   Current checksum: ', checksum);
          console.error(
            '\n   Never modify applied migrations. Create a new migration instead.',
          );
          process.exit(1);
        }

        console.log(`⊘ ${file} (already applied)`);
        skippedCount++;
        continue;
      }

      // Apply new migration
      console.log(`→ Applying ${file}...`);

      await client.query('BEGIN');
      try {
        // Run the migration SQL
        await client.query(sql);

        // Record it in migrations table
        await client.query(
          `INSERT INTO schema_migrations (name, sql_text, checksum) 
           VALUES ($1, $2, $3)`,
          [file, sql, checksum],
        );

        await client.query('COMMIT');
        console.log(`✓ ${file} applied successfully`);
        appliedCount++;
      } catch (error: any) {
        await client.query('ROLLBACK');
        console.error(`\n✗ Failed to apply ${file}`);
        console.error('Error:', error.message);

        if (error.position) {
          console.error('SQL Error at position:', error.position);
        }

        console.error('\nMigration content:');
        console.error('---');
        console.error(sql);
        console.error('---\n');

        process.exit(1);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    if (appliedCount === 0) {
      console.log('✓ Database is up to date');
      console.log(`  ${skippedCount} migration(s) already applied`);
    } else {
      console.log(`✓ Successfully applied ${appliedCount} new migration(s)`);
      if (skippedCount > 0) {
        console.log(`  ${skippedCount} migration(s) already applied`);
      }
    }
    console.log('='.repeat(50) + '\n');
  } catch (error: any) {
    console.error('\n✗ Migration system error:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migrations
runMigrations().catch((err) => {
  console.error('✗ Unexpected error:', err);
  process.exit(1);
});
