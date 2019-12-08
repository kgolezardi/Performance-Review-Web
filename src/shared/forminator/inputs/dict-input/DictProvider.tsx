import React, { Dispatch } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { DictContext } from './DictContext';
import { DictAction } from './dictReducer';

interface OwnProps<V> {
  dispatch: Dispatch<DictAction>;
}

type Props<T> = FCProps<OwnProps<T>>;

function DictProvider<V = any>(props: Props<V>) {
  return (
    <DictContext.Provider value={props.dispatch}>
      {props.children}
    </DictContext.Provider>
  );
}

export default DictProvider;
