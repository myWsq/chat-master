import { randomUUID } from 'crypto';
import { BaseEntity } from 'utils/base-entity';

export interface UserEntityProps {
  id: string;
}

export class UserEntity extends BaseEntity<UserEntityProps> {
  static create() {
    return new UserEntity(randomUUID());
  }
}
