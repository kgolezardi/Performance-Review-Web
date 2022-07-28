import { useImperativeHandle } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useFragmentContext } from '../fragment/FragmentContext';
import { useStoreContext } from '../store/StoreContext';
import { FragmentLens } from './FragmentLens';

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
