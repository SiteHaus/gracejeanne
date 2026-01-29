import { Module } from '@nestjs/common';
import { SiteHausAuthModule } from '@sitehaus/client-sdk/nestjs';
import { PostsModule } from './posts/posts.module.js';

@Module({
  imports: [
    SiteHausAuthModule.forRoot({
      iamUrl: process.env.IAM_URL!,
      clientKey: process.env.IAM_CLIENT_KEY!,
      cacheTtlMs: 5000,
    }),
    PostsModule,
  ],
})
export class AppModule {}
