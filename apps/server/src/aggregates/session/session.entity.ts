import { randomUUID } from 'crypto';
import { BaseEntity } from 'utils/base-entity';
import { PromptEntity } from '../prompt/prompt.entity';
import { UserEntity } from '../user/user.entity';

export interface SessionEntityProps {
  id: string;
  promptId: string;
  userId: string;
  updatedAt: Date;
}

export interface SessionCreateParams {
  prompt: PromptEntity;
  user: UserEntity;
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
    const { prompt, user } = params;
    const entity = new SessionEntity(randomUUID());
    entity.setPromptId(prompt);
    entity.setUserId(user);
    return entity;
  }

  setPromptId(prompt: PromptEntity) {
    this.$set('promptId', prompt.id);
  }

  setUserId(user: UserEntity) {
    this.$set('userId', user.id);
  }

  resetUpdatedAt() {
    this.$set('updatedAt', new Date());
  }
}
