import { PromptEntity } from 'src/aggregates/prompt/prompt.entity';

export class PromptDTO {
  title: string;
  content: string;
  userId: string;
  updatedAt: Date;

  constructor(params: PromptEntity) {
    this.title = params.title;
    this.content = params.content;
    this.userId = params.userId;
    this.updatedAt = params.updatedAt;
  }
}
