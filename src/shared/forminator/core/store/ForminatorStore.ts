import Mitt from 'mitt';
import nanoid from 'nanoid';

import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { FragmentOwner } from '../owner/FragmentOwner';
import { MapSubscribable } from '../subscribable/MapSubscribable';
import { Subscribable } from '../subscribable/types';

export class ForminatorStore {
  emitter = Mitt();

  states = new Map();

  subscribables = new Map();

  initialValues = new Map();

  snapshot() {
    const snapshot = new ForminatorStore();
    snapshot.emitter = this.emitter;
    snapshot.states = new Map(this.states);
    return snapshot;
  }

  getSubscribable<V>(type: string, fragment: ForminatorFragment<V>): Subscribable<V> {
    const key = type + ':' + fragment.id;
    if (!this.subscribables.has(key)) {
      const subscribable = new MapSubscribable(this.states, this.emitter, key);
      this.subscribables.set(key, subscribable);
    }
    return this.subscribables.get(key);
  }

  getValueSubscribable<V>(fragment: ForminatorFragment<V>) {
    return this.getSubscribable('value', fragment);
  }

  getOwnerSubscribable<V, Value>(fragment: ForminatorFragment<V>) {
    return this.getSubscribable<FragmentOwner<V, Value> | null>('owner', fragment);
  }

  createFragment<V>(initialValue?: V | undefined) {
    const fragment = {
      id: nanoid(),
      $$typeof: Symbol.for('forminator.fragment'),
    };
    if (initialValue !== undefined) {
      this.initialValues.set(fragment.id, initialValue);
    }
    return fragment;
  }

  getInitialValue<V>(fragment: ForminatorFragment<V>, defaultValue: V): V;
  getInitialValue<V>(fragment: ForminatorFragment<V>, defaultValue?: V | undefined): V | undefined;
  getInitialValue<V>(fragment: ForminatorFragment<V>, defaultValue?: V | undefined): V | undefined {
    return this.initialValues.has(fragment.id) ? this.initialValues.get(fragment.id) : defaultValue;
  }
}
