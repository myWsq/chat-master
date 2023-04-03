import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { MeilisearchClient } from '../../common/meilisearch-client';
import { PromptEntity, PromptEntityProps } from './prompt.entity';

export class PromptRepository implements RepositoryImpl<PromptEntity> {
  @Inject()
  private _meilisearchClient: MeilisearchClient;

  async load(id: string): Promise<PromptEntity> {
    const index = await this._meilisearchClient.getIndex(
      MeilisearchClient.IndexEnum.prompt,
    );
    return index
      .getDocument(id)
      .then((props: PromptEntityProps) => new PromptEntity(props))
      .catch((error) => {
        throw new UnprocessableEntityException('Prompt loaded failed.', {
          cause: error,
        });
      });
  }

  async save(entity: PromptEntity): Promise<void> {
    const index = await this._meilisearchClient.getIndex(
      MeilisearchClient.IndexEnum.prompt,
    );

    const tasks = await index.addDocuments([entity.$props]);
    console.log(tasks);
  }
}
