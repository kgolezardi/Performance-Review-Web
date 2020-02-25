import { FCProps } from 'src/shared/types/FCProps';

import { useForminatorState } from '../core/useForminatorState';

interface OwnProps<V> {
  initialValue?: V;
}

type Props<V> = FCProps<OwnProps<V>>;

function ConstantInput<V>({ initialValue }: Props<V>) {
  useForminatorState(initialValue);
  return null;
}

export default ConstantInput;
