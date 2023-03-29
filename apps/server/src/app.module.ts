import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregatesModule } from './aggregates/aggregates.module';
import { ApisModule } from './apis/apis.module';
import { validate } from './config/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    AggregatesModule,
    ApisModule,
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
