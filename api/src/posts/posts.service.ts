import { Injectable } from '@nestjs/common';
import { client } from '../db/db.js'; // Use relative path and pool
import { Public } from '@sitehaus/client-sdk/nestjs';

export interface Post {
  id: number;
  title: string;
  content: string;
}

@Injectable()
@Public()
export class PostsService {
  async getPosts(): Promise<Post[]> {
    const result = await client.query('SELECT * FROM posts');
    console.log('Raw result:', result);
    console.log('Rows:', result.rows);
    console.log('First row:', result.rows[0]);
    return result.rows;
  }
}
