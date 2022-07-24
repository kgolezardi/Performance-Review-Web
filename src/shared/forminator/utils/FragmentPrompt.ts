import { FCProps } from 'src/shared/types/FCProps';
import { equals } from 'ramda';
import { useFormChanged } from 'src/shared/form-change-detector';

import { useFragmentContext } from '../core/fragment/FragmentContext';
import { useFragmentValue } from '../core/utils/useFragmentValue';

export type Equal<VF, VS> = (fragmentValue: VF | undefined, propValue: VS | undefined) => boolean;

interface OwnProps<VF, VS> {
  value: VS | undefined;
  /**
   * return true if values is equal
   */
  equal?: Equal<VF, VS>;
}

type Props<VF, VS> = FCProps<OwnProps<VF, VS>>;

function FragmentPrompt<VF, VS>(props: Props<VF, VS>) {
  const { equal = equals } = props;
  const fragment = useFragmentContext<VF>();
  const value = useFragmentValue<VF>();
  const when = value !== undefined && !equal(value, props.value);
  useFormChanged(fragment.id, when);
  return null;
}

export default FragmentPrompt;
