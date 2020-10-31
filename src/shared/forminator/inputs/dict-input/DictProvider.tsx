import React, { Dispatch } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { DictAction } from './dictReducer';
import { DictContext } from './DictContext';

interface OwnProps {
  dispatch: Dispatch<DictAction>;
}

type Props = FCProps<OwnProps>;

function DictProvider(props: Props) {
  return <DictContext.Provider value={props.dispatch}>{props.children}</DictContext.Provider>;
}

export default DictProvider;
