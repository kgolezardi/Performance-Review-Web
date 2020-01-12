export interface ReadOnlySubscribable<V> {
  getValue(): V | undefined;
  getValue(defaultValue: V): V;
  getValue(defaultValue?: V): V | undefined;
  subscribe(callback: (value: V) => void): () => void;
}

export interface Subscribable<V> extends ReadOnlySubscribable<V> {
  setValue(value: V): void;
}
