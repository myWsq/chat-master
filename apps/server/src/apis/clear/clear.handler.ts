import { Inject } from '@nestjs/common';
import { HandlerImpl } from '../../../utils/handler-impl';
import { MeilisearchClient } from '../../common/meilisearch-client';

export class ClearHandler implements HandlerImpl {
  @Inject()
  private _meilisearchClient: MeilisearchClient;

  async execute() {
    const tasks = MeilisearchClient.Indexes.map((index) =>
      this._meilisearchClient.deleteIndexIfExists(index),
    );
    await Promise.all(tasks);
    await this._meilisearchClient.initIndex();
  }
}
