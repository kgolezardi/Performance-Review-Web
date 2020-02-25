import { Ref } from 'react';

import { SubStore } from './types';
import { Subscribable } from '../subscribable/types';
import { ValueSubscribable } from '../subscribable/ValueSubscribable';

export class FragmentLens<V> {
  subscribable = new ValueSubscribable<SubStore<V> | null>();

  getRef(): Ref<SubStore<V>> {
    return (subStore: SubStore<V> | null) => {
      if (subStore) {
        this.setSubStore(subStore);
      } else {
        this.setSubStore(null);
      }
    };
  }

  getSubscribable(): Subscribable<SubStore<V> | null> {
    return this.subscribable;
  }

  getSubStore(): SubStore<V> | null | undefined {
    return this.subscribable.getValue();
  }

  setSubStore(subStore: SubStore<V> | null) {
    this.subscribable.setValue(subStore);
  }
}
