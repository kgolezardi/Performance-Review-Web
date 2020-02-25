import Mitt, { Emitter } from 'mitt';

import { Subscribable } from './types';

export class ValueSubscribable<V> implements Subscribable<V> {
  private key: string = 'value';
  private readonly emitter: Emitter = Mitt();
  constructor(private value?: V | undefined) {}

  getValue(): V | undefined;
  getValue(defaultValue: V): V;
  getValue(defaultValue?: V): V | undefined;
  getValue(defaultValue?: V): any {
    return this.value === undefined ? defaultValue : this.value;
  }

  setValue(value: V): void {
    this.value = value;
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
