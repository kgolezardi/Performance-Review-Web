import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { ReadOnlySubscribable } from '../subscribable/types';

export interface FragmentOwner<V, Value> {
  getValue(fragment: ForminatorFragment<V>, store: ForminatorStore): Value;
  subscribeValue(fragment: ForminatorFragment<V>, store: ForminatorStore, callback: (value: Value) => void): () => void;
  getSubscribable(fragment: ForminatorFragment<V>, store: ForminatorStore): ReadOnlySubscribable<Value>;
}
