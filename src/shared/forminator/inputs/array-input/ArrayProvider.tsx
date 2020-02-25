import React, { Dispatch } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { ArrayAction } from './arrayReducer';
import { ArrayContext } from './ArrayContext';

interface OwnProps<V> {
  dispatch: Dispatch<ArrayAction>;
}

type Props<T> = FCProps<OwnProps<T>>;

function ArrayProvider<V = any>(props: Props<V>) {
  return <ArrayContext.Provider value={props.dispatch}>{props.children}</ArrayContext.Provider>;
}

export default ArrayProvider;
