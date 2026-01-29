-- First, drop the foreign key constraint from posts
ALTER TABLE posts
DROP CONSTRAINT posts_user_id_fkey;

-- Then change the column type
ALTER TABLE posts
ALTER COLUMN user_id TYPE VARCHAR(255) USING user_id::TEXT;

ALTER TABLE orders
DROP CONSTRAINT orders_user_id_fkey;

-- Then change the column type
ALTER TABLE orders
ALTER COLUMN user_id TYPE VARCHAR(255) USING user_id::TEXT;


ALTER TABLE sessions
DROP CONSTRAINT sessions_user_id_fkey;

-- Then change the column type
ALTER TABLE sessions
ALTER COLUMN user_id TYPE VARCHAR(255) USING user_id::TEXT;


-- Now you can safely drop the users table
DROP TABLE users;