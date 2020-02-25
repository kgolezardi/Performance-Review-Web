import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { SubmitContext } from './SubmitContext';

interface OwnProps {
  onSubmit(): Promise<void>;
}

type Props = FCProps<OwnProps>;

function SubmitProvider(props: Props) {
  return <SubmitContext.Provider value={props.onSubmit}>{props.children}</SubmitContext.Provider>;
}

export default SubmitProvider;
