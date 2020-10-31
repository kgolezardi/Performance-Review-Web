import React, { Dispatch } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { ArrayAction } from './arrayReducer';
import { ArrayContext } from './ArrayContext';

interface OwnProps {
  dispatch: Dispatch<ArrayAction>;
}

type Props = FCProps<OwnProps>;

function ArrayProvider(props: Props) {
  return <ArrayContext.Provider value={props.dispatch}>{props.children}</ArrayContext.Provider>;
}

export default ArrayProvider;
