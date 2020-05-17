import { Subscribable } from './types';

export async function getSubscribableValue<V>(subscribable: Subscribable<V>): Promise<V> {
  const value = subscribable.getValue();
  if (value !== undefined) {
    return value;
  }
  return new Promise<V>((resolve) => {
    const unsubscribe = subscribable.subscribe((value) => {
      unsubscribe();
      resolve(value);
    });
  });
}
