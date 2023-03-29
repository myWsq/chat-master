import { randomUUID } from 'crypto';
import { BaseEntity } from '../../../utils/base-entity';
import { PromptEntity } from '../prompt/prompt.entity';

export interface SessionEntityProps {
  id: string;
  promptId: string;
  userId: string;
  updatedAt: Date;
}

export interface SessionCreateParams {
  prompt: PromptEntity;
  userId: string;
}

export class SessionEntity extends BaseEntity<SessionEntityProps> {
  get promptId() {
    return this.$getOrThrow('promptId');
  }

  get userId() {
    return this.$getOrThrow('userId');
  }

  get updatedAt() {
    return this.$getOrThrow('updatedAt');
  }

  static create(params: SessionCreateParams): SessionEntity {
    const { prompt, userId } = params;
    const entity = new SessionEntity(randomUUID());
    entity.setPromptId(prompt);
    entity.setUserId(userId);
    return entity;
  }

  setPromptId(prompt: PromptEntity) {
    this.$set('promptId', prompt.id);
  }

  setUserId(userId: string) {
    if (!userId) throw new Error('userId is required');
    this.$set('userId', userId);
  }

  resetUpdatedAt() {
    this.$set('updatedAt', new Date());
  }
}
