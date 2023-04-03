import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseEntity } from '../../../utils/base-entity';
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
    entity.setUserId(user);
    entity.setTitle(title, user);
    entity.setContent(content, user);
    return entity;
  }

  setTitle(title: string, user: UserEntity) {
    this.validateOwner(user);
    if (!title) {
      throw new BadRequestException('title is required');
    }
    if (title.length > 50) {
      throw new BadRequestException('title too long');
    }
    this.$set('title', title);
    this.resetUpdatedAt();
  }

  setContent(content: string, user: UserEntity) {
    this.validateOwner(user);
    if (!content) {
      throw new BadRequestException('content is required');
    }
    if (content.length > 3000) {
      throw new BadRequestException('content too long');
    }
    this.$set('content', content);
    this.resetUpdatedAt();
  }

  validateOwner(user: UserEntity) {
    if (this.userId !== user.id) {
      throw new BadRequestException('You are not the owner of this prompt');
    }
  }

  setUserId(user: UserEntity) {
    this.$set('userId', user.id);
  }

  resetUpdatedAt() {
    this.$set('updatedAt', new Date());
  }
}
