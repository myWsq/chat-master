import { randomUUID } from 'crypto';
import { BaseEntity } from '../../../utils/base-entity';
import { PromptEntity } from '../prompt/prompt.entity';
import { Session } from '@prisma/client';

export interface SessionCreateParams {
  prompt: PromptEntity;
}

export class SessionEntity extends BaseEntity<Session> {
  get promptId() {
    return this.$get('promptId');
  }

  get userId() {
    return this.$get('userId');
  }

  get createdAt() {
    return this.$get('createdAt');
  }

  static create(params: SessionCreateParams): SessionEntity {
    const { prompt } = params;
    const entity = new SessionEntity(randomUUID());
    entity.setPromptId(prompt);
    entity.setUserIdFromPrompt(prompt);
    entity.resetCreatedAt();
    return entity;
  }

  setPromptId(prompt: PromptEntity) {
    this.$set('promptId', prompt.id);
  }

  setUserIdFromPrompt(prompt: PromptEntity) {
    this.$set('userId', prompt.userId);
  }

  resetCreatedAt() {
    this.$set('createdAt', new Date());
  }
}
