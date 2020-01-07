import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';

export interface FragmentOwner<V, Value> {
  getValue(fragment: ForminatorFragment<V>, store: ForminatorStore): Promise<Value>;
  subscribeValue(fragment: ForminatorFragment<V>, store: ForminatorStore, callback: (value: Value) => void): () => void;
}
