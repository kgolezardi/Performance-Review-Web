import React, { useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import ArrayProvider from './ArrayProvider';
import { ArrayOwner } from './ArrayOwner';
import { arrayInitializer, arrayReducer } from './arrayReducer';
import { useForminatorReducer } from '../../core/useForminatorReducer';
import { useOwner } from '../../core/owner/useOwner';

interface OwnProps<V> {
  initialValue?: (V | undefined)[] | undefined;
}

type Props<V> = FCProps<OwnProps<V>>;

function ArrayInput<V>(props: Props<V>) {
  const [owner] = useState(() => new ArrayOwner<V>());
  useOwner(owner);

  const [, dispatch] = useForminatorReducer(arrayReducer, props.initialValue, arrayInitializer);

  return <ArrayProvider dispatch={dispatch}>{props.children}</ArrayProvider>;
}

export default ArrayInput;
