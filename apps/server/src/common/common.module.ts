import { Module, Global, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { MeilisearchClient } from './meilisearch-client';

@Global()
@Module({
  providers: [MeilisearchClient, AuthService],
  exports: [MeilisearchClient, AuthService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
