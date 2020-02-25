import React, { useCallback, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import FragmentProvider from './core/fragment/FragmentProvider';
import StoreProvider from './core/store/StoreProvider';
import SubmitProvider from './core/submit/SubmitProvider';
import { ForminatorStore } from './core/store/ForminatorStore';
import { getFragmentFinalValue } from './core/fragment/getFragmentFinalValue';

interface OwnProps<Value> {
  initialValue?: Value;
  onSubmit(value: Value): Promise<void> | void;
}

type Props<Value> = FCProps<OwnProps<Value>>;

function Forminator<V, Value>(props: Props<Value>) {
  const [store] = useState(() => new ForminatorStore());
  const [fragment] = useState(() => store.createFragment<Value>(props.initialValue));

  const { onSubmit } = props;

  const handleSubmit = useCallback(async () => {
    const value = await getFragmentFinalValue<V, Value>(fragment, store.snapshot());
    await onSubmit(value);
  }, [fragment, store, onSubmit]);

  return (
    <StoreProvider value={store}>
      <SubmitProvider onSubmit={handleSubmit}>
        <FragmentProvider value={fragment}>{props.children}</FragmentProvider>
      </SubmitProvider>
    </StoreProvider>
  );
}

export default Forminator;
