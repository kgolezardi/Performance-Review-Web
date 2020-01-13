import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { ForminatorFragment } from 'src/shared/forminator/core/fragment/ForminatorFragment';
import { useFragmentContext } from 'src/shared/forminator/core/fragment/FragmentContext';
import { useStoreContext } from 'src/shared/forminator/core/store/StoreContext';
import { useReadonlySubscribableValue } from 'src/shared/forminator/core/subscribable/useReadonlySubscribableValue';
import { getFragmentsValues, subscribeFragments } from 'src/shared/forminator/core/utils/subscribeFragments';
import { usePrompt } from 'src/shared/prompt';

import { FCProps } from 'src/shared/types/FCProps';

export type Equal = (
  fragmentValue: ReadonlyArray<string | undefined>,
  propValue: ReadonlyArray<string | undefined>,
) => boolean;

const defaultEqual: Equal = (fragmentValue, propValue) => equals(fragmentValue, propValue);
interface OwnProps {
  value: ReadonlyArray<string | undefined>;
  /**
   * return true if values is equal
   */
  equal?: Equal;
}

type Props = FCProps<OwnProps>;
interface Subscribe {
  resubscribe: (fragments: ForminatorFragment[]) => void;
}

const useFragmentsValue = () => {
  const fragment = useFragmentContext();
  const store = useStoreContext();
  const fragmentValue: ForminatorFragment[] =
    useReadonlySubscribableValue<Array<ForminatorFragment>>(store.getValueSubscribable(fragment)) || [];
  const [value, setValue] = useState<Array<string | undefined>>(() => getFragmentsValues<string>(fragmentValue, store));
  const [subscribe, setSubscribe] = useState<Subscribe>(() => ({
    resubscribe: () => {},
  }));
  useEffect(() => {
    const resubscribe = subscribeFragments<string>([], store, values => {
      setValue(values);
    });
    setSubscribe({ resubscribe });
  }, [store]);

  useEffect(() => {
    setValue(getFragmentsValues(fragmentValue, store));
    subscribe.resubscribe(fragmentValue);
  }, [fragmentValue, subscribe, store]);
  return value;
};

export function ArrayValuePrompt(props: Props) {
  const { equal = defaultEqual } = props;
  const value = useFragmentsValue();
  const when = !equal(value, props.value);
  const fragment = useFragmentContext();
  usePrompt(fragment.id, when);
  return null;
}
