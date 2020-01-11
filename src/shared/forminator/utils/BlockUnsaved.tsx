import React from 'react';
import { Prompt } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { useFragmentFinalValue } from '../core/utils/useFragmentFinalValue';

interface OwnProps {
  message: string;
}

type Props = FCProps<OwnProps>;

function BlockUnsaved(props: Props) {
  console.log(useFragmentFinalValue());
  return <Prompt message={props.message} />;
}

export default BlockUnsaved;
