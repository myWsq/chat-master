import { randomUUID } from 'crypto';
import { BaseEntity } from 'utils/base-entity';
import { UserEntity } from '../user/user.entity';

export interface PromptEntityProps {
  id: string;
  title: string;
  content: string;
  userId: string;
  updatedAt: Date;
}

export interface PromptEntityCreateParams {
  title: string;
  content: string;
  user: UserEntity;
}

export class PromptEntity extends BaseEntity<PromptEntityProps> {
  get title() {
    return this.$getOrThrow('title');
  }

  get content() {
    return this.$getOrThrow('content');
  }

  get userId() {
    return this.$getOrThrow('userId');
  }

  get updatedAt() {
    return this.$getOrThrow('updatedAt');
  }

  static create(params: PromptEntityCreateParams): PromptEntity {
    const { title, content, user } = params;
    const entity = new PromptEntity(randomUUID());
    entity.setTitle(title);
    entity.setContent(content);
    entity.setUserId(user);
    return entity;
  }

  setTitle(title: string) {
    if (!title) {
      throw new Error('title is required');
    }
    if (title.length > 50) {
      throw new Error('title too long');
    }
    this.$set('title', title);
    this.resetUpdatedAt();
  }

  setContent(content: string) {
    if (!content) {
      throw new Error('content is required');
    }
    if (content.length > 3000) {
      throw new Error('content too long');
    }
    this.$set('content', content);
    this.resetUpdatedAt();
  }

  setUserId(user: UserEntity) {
    this.$set('userId', user.id);
    this.resetUpdatedAt();
  }

  resetUpdatedAt() {
    this.$set('updatedAt', new Date());
  }
}
