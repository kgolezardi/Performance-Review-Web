import { useState } from 'react';

import { FragmentLens } from './FragmentLens';

export function useFragmentLens<V>(): FragmentLens<V> {
  return useState(() => new FragmentLens<V>())[0];
}
