export class BaseEntity<Props extends { id: string }> {
  readonly id: Props['id'];

  private _props: Props;
  private _eventQueue: unknown[] = [];

  constructor(idOrProps: string | Props) {
    if (typeof idOrProps === 'string') {
      this.id = idOrProps;
      // @ts-expect-error -- 预期之内的错误, 使用 id 初始化表示可以接受空 props 的情况
      this._props = { id: this.id };
    } else {
      this.id = idOrProps.id;
      this._props = idOrProps;
    }
  }

  /**
   * 获取模型内部可持久化数据.
   * 仅限 Repository 读取
   */
  get $props(): Readonly<Props> {
    return this._props;
  }

  /**
   * 获取实体抛出的所有事件并清空事件队列.
   * 仅限 Repository 调用
   */
  $commit(): unknown[] {
    const result = [...this._eventQueue];
    this._eventQueue = [];
    return result;
  }

  /**
   * 验证实体数据完整性.
   * 仅限 Repository 调用
   */
  $validate(): void {
    // 可被覆盖
    return;
  }

  /**
   * 修改模型内部数据.
   * 为了保证数据完整性, 仅限实体内部调用
   */
  protected $set<K extends keyof Props>(key: K, value: Props[K]): void;
  protected $set(props: Partial<Props>): void;
  protected $set(keyOrProps: keyof Props | Partial<Props>, value?: any): void {
    if (typeof keyOrProps === 'object') {
      this._props = {
        ...this._props,
        ...keyOrProps,
        id: this.id,
      };
      return;
    } else {
      this._props[keyOrProps] = value;
    }
  }

  /**
   * 获取模型内部属性.
   * 为了保证数据正确性, 仅限实体内部调用
   * @param key 属性名
   */
  protected $get<K extends keyof Props>(key: K): Props[K] {
    return this._props[key];
  }

  /**
   * 获取模型内部属性, 可以额外对属性进行非空断言. 当属性返回 null 或 undefined 时, 会抛出错误
   * @param key 属性名
   */
  protected $getOrThrow<K extends keyof Props>(key: K): NonNullable<Props[K]> {
    const val = this._props[key];
    if (val === null || val === undefined) {
      throw new Error('Unexpected prop null value');
    }
    return val;
  }

  /**
   * 抛出领域事件.
   * 仅限实体内部调用
   */
  protected $emit(...events: unknown[]): void {
    this._eventQueue.push(...events);
  }
}
