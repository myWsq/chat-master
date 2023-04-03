import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { PrismaService } from '../../common/prisma.service';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionRepository implements RepositoryImpl<SessionEntity> {
  @Inject()
  private _prismaService: PrismaService;

  async load(id: string): Promise<SessionEntity> {
    const model = await this._prismaService.session.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new NotFoundException('Session not found.');
    }
    return new SessionEntity(model);
  }

  async save(entity: SessionEntity): Promise<void> {
    await this._prismaService.session.upsert({
      where: {
        id: entity.id,
      },
      create: entity.$props,
      update: entity.$props,
    });
  }
}
