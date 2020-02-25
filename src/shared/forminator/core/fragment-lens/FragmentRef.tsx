import { FCProps } from 'src/shared/types/FCProps';
import { useImperativeHandle } from 'react';

import { FragmentLens } from './FragmentLens';
import { useFragmentContext } from '../fragment/FragmentContext';
import { useStoreContext } from '../store/StoreContext';

interface OwnProps<V> {
  lens: FragmentLens<V>;
}

export type Props<V> = FCProps<OwnProps<V>>;

function FragmentRef<V>(props: Props<V>) {
  const fragment = useFragmentContext();
  const store = useStoreContext();
  useImperativeHandle(props.lens.getRef(), () => ({ fragment, store }), [fragment, store]);
  return null;
}

export default FragmentRef;
