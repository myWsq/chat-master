import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Meilisearch, { ErrorStatusCode, MeiliSearchApiError } from 'meilisearch';
import { Config } from 'src/config/config';
import { z } from 'zod';

@Injectable()
export class MeilisearchClient extends Meilisearch implements OnModuleInit {
  constructor(_configService: ConfigService<Config>) {
    super({
      host: _configService.getOrThrow('MEILISEARCH_ENDPOINT'),
      apiKey: _configService.getOrThrow('MEILISEARCH_MASTER_KEY'),
    });
  }

  static Indexes = ['prompt', 'message'] as const;
  static IndexEnum = z.enum(MeilisearchClient.Indexes).enum;

  async onModuleInit() {
    const tasks = MeilisearchClient.Indexes.map(async (index) => {
      try {
        await this.getIndex(index);
      } catch (error) {
        if (
          error instanceof MeiliSearchApiError &&
          error.code === ErrorStatusCode.INDEX_NOT_FOUND
        ) {
          await this.createIndex(index);
        } else {
          throw error;
        }
      }
    });
    await Promise.all(tasks);
  }
}