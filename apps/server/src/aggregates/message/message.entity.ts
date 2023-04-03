import { randomUUID } from 'crypto';
import { BaseEntity } from '../../../utils/base-entity';
import { Message } from '@prisma/client';
import { SessionEntity } from '../session/session.entity';

export interface MessageEntityCreateParams {
  role: string;
  content: string;
  session: SessionEntity;
}

export class MessageEntity extends BaseEntity<Message> {
  get content() {
    return this.$get('content');
  }

  get role() {
    return this.$get('role') as 'user' | 'bot';
  }

  get sessionId() {
    return this.$get('sessionId');
  }

  get promptId() {
    return this.$get('promptId');
  }

  get createdAt() {
    return this.$get('createdAt');
  }

  static create(params: MessageEntityCreateParams): MessageEntity {
    const entity = new MessageEntity(randomUUID());
    entity.setContent(params.content);
    entity.setRole(params.role);
    entity.setSessionId(params.session);
    entity.setPromptIdFromSession(params.session);
    entity.resetCreatedAt();
    return entity;
  }

  setContent(content: string) {
    if (content.length > 20000) {
      throw new Error(
        'Message content cannot be longer than 20,000 characters',
      );
    }
    if (content.trim().length === 0) {
      throw new Error('Message content cannot be empty');
    }
    this.$set('content', content);
  }

  setRole(role: string) {
    if (!['user', 'bot'].includes(role)) {
      throw new Error('Message role must be either "user" or "bot"');
    }
    this.$set('role', role);
  }

  setSessionId(session: SessionEntity) {
    this.$set('sessionId', session.id);
  }

  setPromptIdFromSession(session: SessionEntity) {
    this.$set('promptId', session.promptId);
  }

  resetCreatedAt() {
    this.$set('createdAt', new Date());
  }
}
