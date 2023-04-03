import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Meilisearch, { ErrorStatusCode, MeiliSearchApiError } from 'meilisearch';
import { z } from 'zod';
import { Config } from '../config/config';

@Injectable()
export class MeilisearchService extends Meilisearch implements OnModuleInit {
  constructor(_configService: ConfigService<Config>) {
    super({
      host: _configService.getOrThrow('MEILISEARCH_ENDPOINT'),
      apiKey: _configService.getOrThrow('MEILISEARCH_MASTER_KEY'),
    });
  }

  static Indexes = ['prompt', 'message', 'user'] as const;
  static IndexEnum = z.enum(MeilisearchService.Indexes).enum;

  async onModuleInit() {
    await this.initIndex();
  }

  async initIndex() {
    const tasks = MeilisearchService.Indexes.map(async (index) => {
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
    await this._configUserIndex();
  }

  private async _configUserIndex() {
    await this.index('user').updateSettings({
      filterableAttributes: ['apiKey'],
    });
  }
}
