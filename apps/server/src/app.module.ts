import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregatesModule } from './aggregates/aggregates.module';
import { HandlersModule } from './handlers/handlers.module';
import { validate } from './config/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AggregatesModule,
    HandlersModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      validate,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
