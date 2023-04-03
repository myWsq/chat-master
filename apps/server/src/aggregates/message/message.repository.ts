import { Inject, Injectable } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { MessageEntity } from './message.entity';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class MessageRepository implements RepositoryImpl<MessageEntity> {
  @Inject()
  private _prismaService: PrismaService;

  async save(entity: MessageEntity): Promise<void> {
    await this._prismaService.message.upsert({
      where: {
        id: entity.id,
      },
      create: entity.$props,
      update: entity.$props,
    });
  }
}
