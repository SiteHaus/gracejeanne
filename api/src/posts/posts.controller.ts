// posts.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PostsService, Post } from './posts.service.js';
import { Public } from '@sitehaus/client-sdk/nestjs';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Public()
  @Get('getPosts')
  async getPosts(): Promise<Post[]> {
    return await this.postsService.getPosts();
  }
}
