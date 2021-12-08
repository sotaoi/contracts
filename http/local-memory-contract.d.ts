declare abstract class LocalMemoryContract {
  abstract set(key: string, value: any): Promise<void>;
  abstract get(key: string): Promise<any>;
  abstract remove(key: string): Promise<void>;
}

export { LocalMemoryContract };
