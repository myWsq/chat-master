import { BaseEntity } from './base-entity';

export interface RepositoryImpl<E extends BaseEntity<any>> {
  /**
   * 判断实体是否存在
   * @param entity 目标实体
   * @returns 是否存在
   */
  exists?(entity: E): Promise<boolean>;

  /**
   * 删除实体
   * @param entity 目标实体
   * @returns 是否成功删除
   */
  delete?(entity: E): Promise<boolean>;

  /**
   * 删除多个实体
   * @param ids ID 列表
   * @returns 删除实体的数量
   */
  deleteMany?(ids: string[]): Promise<number>;

  /**
   * 保存实体, 如果实体存在则更新数据, 如果不存在则插入一条数据
   * @param entity 目标实体
   */
  save?(entity: E): Promise<void>;

  /**
   * 加载实体, 如果实体不存在抛出 ErrUnprocessable
   * @param id
   * @returns 目标实体
   */
  load?(id: string): Promise<E>;

  /**
   * 查询多个实体
   * @param ids ID 列表
   * @returns 查询结果
   */
  loadMany?(ids: string[]): Promise<E[]>;
}
