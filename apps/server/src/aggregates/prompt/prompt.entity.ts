import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BaseEntity } from '../../../utils/base-entity';
import { UserEntity } from '../user/user.entity';
import { Prompt } from '@prisma/client';

export interface PromptEntityCreateParams {
  title: string;
  content: string;
  user: UserEntity;
}

export class PromptEntity extends BaseEntity<Prompt> {
  get title() {
    return this.$get('title');
  }

  get content() {
    return this.$get('content');
  }

  get userId() {
    return this.$get('userId');
  }

  get updatedAt() {
    return this.$get('updatedAt');
  }

  static create(params: PromptEntityCreateParams): PromptEntity {
    const { title, content, user } = params;
    const entity = new PromptEntity(randomUUID());
    entity.setUserId(user);
    entity.setTitle(title, user);
    entity.setContent(content, user);
    entity.resetUpdatedAt();
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
