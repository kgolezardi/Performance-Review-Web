import * as React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import SubmitProvider from '../core/submit/SubmitProvider';
import { FragmentLens } from '../core/fragment-lens/FragmentLens';
import { useSubmitContext } from '../core/submit/SubmitContext';

interface OwnProps<V> {
  lens: FragmentLens<V>;
  resetValue: V;
}

type Props<V> = FCProps<OwnProps<V>>;

function ResetInputOnSubmit<V>({ lens, resetValue, children }: Props<V>) {
  const onClick = useSubmitContext();

  const handleSubmit = React.useCallback(async () => {
    await onClick();
    const subStore = lens.getSubStore();
    if (subStore && subStore.fragment) {
      subStore.store.getValueSubscribable(subStore.fragment).setValue(resetValue);
    }
  }, [lens, onClick, resetValue]);

  return <SubmitProvider onSubmit={handleSubmit}>{children}</SubmitProvider>;
}

export default ResetInputOnSubmit;
