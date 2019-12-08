import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';

export interface SubStore<V = any> {
  fragment: ForminatorFragment<V>;
  store: ForminatorStore;
}
