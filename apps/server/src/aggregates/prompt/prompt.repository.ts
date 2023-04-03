import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { PromptEntity } from './prompt.entity';
import { PrismaService } from '../../common/prisma.service';

export class PromptRepository implements RepositoryImpl<PromptEntity> {
  @Inject()
  private _prismaService: PrismaService;

  async load(id: string): Promise<PromptEntity> {
    const model = await this._prismaService.prompt.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new NotFoundException('Prompt not found.');
    }
    return new PromptEntity(model);
  }

  async save(entity: PromptEntity): Promise<void> {
    await this._prismaService.prompt.upsert({
      where: {
        id: entity.id,
      },
      create: entity.$props,
      update: entity.$props,
    });
  }
}
