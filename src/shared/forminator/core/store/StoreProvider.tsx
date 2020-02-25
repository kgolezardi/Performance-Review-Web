import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { ForminatorStore } from './ForminatorStore';
import { StoreContext } from './StoreContext';

interface OwnProps {
  value: ForminatorStore;
}

type Props = FCProps<OwnProps>;

function StoreProvider(props: Props) {
  return <StoreContext.Provider value={props.value}>{props.children}</StoreContext.Provider>;
}

export default StoreProvider;
