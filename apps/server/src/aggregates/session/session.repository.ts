import { Inject, Injectable } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { PrismaService } from '../../common/prisma.service';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionRepository implements RepositoryImpl<SessionEntity> {
  @Inject()
  private _prismaService: PrismaService;

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
