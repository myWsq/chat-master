import { Inject, NotFoundException } from '@nestjs/common';
import { RepositoryImpl } from '../../../utils/repository-impl';
import { UserEntity } from './user.entity';
import { PrismaService } from '../../common/prisma.service';

export class UserRepository implements RepositoryImpl<UserEntity> {
  @Inject()
  private _prismaService: PrismaService;

  async load(id: string): Promise<UserEntity> {
    const model = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!model) {
      throw new NotFoundException('User not found.');
    }
    return new UserEntity(model);
  }

  async save(entity: UserEntity): Promise<void> {
    await this._prismaService.user.upsert({
      where: {
        id: entity.id,
      },
      create: entity.$props,
      update: entity.$props,
    });
  }

  async findByApiKey(apiKey: string): Promise<UserEntity | null> {
    return await this._prismaService.user
      .findUnique({
        where: {
          apiKey,
        },
      })
      .then((hit) => hit && new UserEntity(hit));
  }
}
