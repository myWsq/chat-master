import { Module, Global } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { MeilisearchClient } from './meilisearch-client';

@Global()
@Module({
  providers: [MeilisearchClient, AdminGuard],
  exports: [MeilisearchClient],
})
export class CommonModule {}
