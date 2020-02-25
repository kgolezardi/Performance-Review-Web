import { Emitter } from 'mitt';

import { Subscribable } from './types';

export class MapSubscribable<V> implements Subscribable<V> {
  constructor(
    private readonly values: Map<string, any>,
    private readonly emitter: Emitter,
    private readonly key: string,
  ) {}

  getValue(): V | undefined;
  getValue(defaultValue: V): V;
  getValue(defaultValue?: V): V | undefined;
  getValue(defaultValue?: V): any {
    return this.values.has(this.key) ? this.values.get(this.key) : defaultValue;
  }

  setValue(value: V): void {
    this.values.set(this.key, value);
    this.emitter.emit(this.key, value);
  }

  subscribe(callback: (value: V) => void): () => void {
    const handler = (value: V) => {
      callback(value);
    };
    this.emitter.on(this.key, handler);
    return () => {
      this.emitter.off(this.key, handler);
    };
  }
}
