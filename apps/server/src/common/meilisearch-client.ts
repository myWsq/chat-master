import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Meilisearch from 'meilisearch';
import { Config } from 'src/config/config';

@Injectable()
export class MeilisearchClient extends Meilisearch {
  constructor(_configService: ConfigService<Config>) {
    super({
      host: _configService.getOrThrow('MEILISEARCH_ENDPOINT'),
      apiKey: _configService.getOrThrow('MEILISEARCH_MASTER_KEY'),
    });
  }
  indexes = ['prompt', 'session', 'message'];
}
