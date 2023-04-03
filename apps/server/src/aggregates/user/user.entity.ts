import { randomUUID } from 'crypto';
import { BaseEntity } from '../../../utils/base-entity';
import { BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';

export interface UserEntityCreateParams {
  tag: string;
  quota: number;
}

export class UserEntity extends BaseEntity<User> {
  get apiKey() {
    return this.$get('apiKey');
  }
  get tag() {
    return this.$get('tag');
  }
  get quota() {
    return this.$get('quota');
  }

  static create(params: UserEntityCreateParams) {
    const { tag, quota } = params;
    const entity = new UserEntity(randomUUID());
    entity._resetApiKey();
    entity.setTag(tag);
    entity.resetQuota();
    entity.addTokenQuota(quota);
    return entity;
  }

  private _resetApiKey() {
    this.$set('apiKey', 'ak-' + randomUUID().replace(/-/g, ''));
  }

  setTag(tag: string) {
    this.$set('tag', tag);
  }

  resetQuota() {
    this.$set('quota', 0);
  }

  addTokenQuota(quota: number) {
    if (quota < 0) {
      throw new BadRequestException('quota must be positive');
    }
    // quota must be a int
    if (quota % 1 !== 0) {
      throw new BadRequestException('quota must be a int');
    }
    this.$set('quota', this.quota + quota);
  }
}
