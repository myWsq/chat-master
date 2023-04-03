import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { UserEntity, UserEntityProps } from './user.entity';
import { MeilisearchClient } from '../../common/meilisearch-client';

export class UserRepository implements RepositoryImpl<UserEntity> {
  @Inject()
  private _meilisearchClient: MeilisearchClient;

  async load(id: string): Promise<UserEntity> {
    const index = await this._meilisearchClient.getIndex(
      MeilisearchClient.IndexEnum.user,
    );
    return index
      .getDocument(id)
      .then((props: UserEntityProps) => new UserEntity(props))
      .catch((error) => {
        throw new UnprocessableEntityException('User loaded failed.', {
          cause: error,
        });
      });
  }

  async save(entity: UserEntity): Promise<void> {
    const index = await this._meilisearchClient.getIndex(
      MeilisearchClient.IndexEnum.user,
    );
    await index.addDocuments([entity.$props]);
  }

  async findByApiKey(apiKey: string): Promise<UserEntity | null> {
    const index = await this._meilisearchClient.getIndex(
      MeilisearchClient.IndexEnum.user,
    );
    const result = await index.search('', {
      filter: `apiKey = ${apiKey}`,
    });

    const hit = result.hits[0];
    return hit ? new UserEntity(hit as UserEntityProps) : null;
  }
}
