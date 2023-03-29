import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseEntity } from 'utils/base-entity';

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
  userId: string;
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
    const { title, content, userId } = params;
    const entity = new PromptEntity(randomUUID());
    entity.setTitle(title);
    entity.setContent(content);
    entity.setUserId(userId);
    return entity;
  }

  setTitle(title: string) {
    if (!title) {
      throw new BadRequestException('title is required');
    }
    if (title.length > 50) {
      throw new BadRequestException('title too long');
    }
    this.$set('title', title);
    this.resetUpdatedAt();
  }

  setContent(content: string) {
    if (!content) {
      throw new BadRequestException('content is required');
    }
    if (content.length > 3000) {
      throw new BadRequestException('content too long');
    }
    this.$set('content', content);
    this.resetUpdatedAt();
  }

  setUserId(userId: string) {
    if (!userId) throw new BadRequestException('userId is required');
    this.$set('userId', userId);
  }

  resetUpdatedAt() {
    this.$set('updatedAt', new Date());
  }
}
