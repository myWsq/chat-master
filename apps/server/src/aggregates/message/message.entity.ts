import { randomUUID } from 'crypto';
import { BaseEntity } from '../../../utils/base-entity';
import { PromptEntity } from '../prompt/prompt.entity';

export interface MessageEntityProps {
  id: string;
  role: string;
  content: string;
  userId: string;
  promptId: string;
  sessionKey: string;
  createdAt: Date;
}

export interface MessageEntityCreateParams {
  content: string;
  role: string;
  prompt: PromptEntity;
  sessionKey: string;
}

export class MessageEntity extends BaseEntity<MessageEntityProps> {
  get content() {
    return this.$getOrThrow('content');
  }

  get role() {
    return this.$getOrThrow('role') as 'user' | 'bot';
  }

  get userId() {
    return this.$getOrThrow('userId');
  }

  get sessionKey() {
    return this.$getOrThrow('sessionKey');
  }

  get promptId() {
    return this.$getOrThrow('promptId');
  }

  get createdAt() {
    return this.$getOrThrow('createdAt');
  }

  static create(params: MessageEntityCreateParams): MessageEntity {
    const { content, sessionKey, role, prompt } = params;
    const entity = new MessageEntity(randomUUID());
    entity.setContent(content);
    entity.setRole(role);
    entity.setUserId(prompt);
    entity.setPromptId(prompt);
    entity.setSessionKey(sessionKey);
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

  setUserId(prompt: PromptEntity) {
    this.$set('userId', prompt.userId);
  }

  setSessionKey(sessionKey: string) {
    if (sessionKey.length > 100) {
      throw new Error('Session key cannot be longer than 100 characters');
    }
    if (sessionKey.trim().length === 0) {
      throw new Error('Session key cannot be empty');
    }
    this.$set('sessionKey', sessionKey);
  }

  setPromptId(prompt: PromptEntity) {
    this.$set('promptId', prompt.id);
  }

  resetCreatedAt() {
    this.$set('createdAt', new Date());
  }
}
