import { Module, Global, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { AuthService } from './auth.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './validation.pipe';
import { AggregatesModule } from '../aggregates/aggregates.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [AggregatesModule],
  providers: [
    PrismaService,
    AuthService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  exports: [AuthService, PrismaService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
