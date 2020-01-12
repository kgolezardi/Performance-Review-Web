import { FCProps } from 'src/shared/types/FCProps';
import { usePrompt } from 'src/shared/prompt';
import { useFragmentContext } from '../core/fragment/FragmentContext';
import { useFragmentValue } from '../core/utils/useFragmentValue';

export type Equal<V> = (fragmentValue: V, propValue: V) => boolean;

const defaultEqual: Equal<unknown> = <V>(fragmentValue: V, propValue: V) => fragmentValue === propValue;

interface OwnProps<V> {
  value: V | undefined;
  /**
   * return true if values is equal
   */
  equal?: Equal<V | undefined>;
}

type Props<V> = FCProps<OwnProps<V>>;

function FragmentPrompt<V>(props: Props<V>) {
  const { equal = defaultEqual } = props;
  const fragment = useFragmentContext<V>();
  const value = useFragmentValue<V>();
  const when = !equal(value, props.value);
  usePrompt(fragment.id, when);
  return null;
}

export default FragmentPrompt;
