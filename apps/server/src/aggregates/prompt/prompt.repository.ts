import { Inject } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { MeilisearchClient } from '../../common/meilisearch-client';
import { PromptEntity } from './prompt.entity';

export class PromptRepository implements RepositoryImpl<PromptEntity> {
  @Inject()
  private _meilisearchClient: MeilisearchClient;

  async save(entity: PromptEntity): Promise<void> {
    const index = await this._meilisearchClient.getIndex(
      MeilisearchClient.IndexEnum.prompt,
    );
    index.addDocuments([entity.$props]);
  }
}
