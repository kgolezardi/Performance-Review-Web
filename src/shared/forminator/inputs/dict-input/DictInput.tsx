import React, { useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import DictProvider from './DictProvider';
import { DictOwner } from './DictOwner';
import { dictInitializer, dictReducer } from './dictReducer';
import { useForminatorReducer } from '../../core/useForminatorReducer';
import { useOwner } from '../../core/owner/useOwner';

interface OwnProps {}

type Props = FCProps<OwnProps>;

function DictInput<V>(props: Props) {
  const [owner] = useState(() => new DictOwner<V>());
  useOwner(owner);

  const [, dispatch] = useForminatorReducer(dictReducer, {}, dictInitializer);

  return <DictProvider dispatch={dispatch}>{props.children}</DictProvider>;
}

export default DictInput;
