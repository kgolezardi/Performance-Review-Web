import React from 'react';
import { Prompt } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { useFragmentValue } from '../core/utils/useFragmentValue';

interface OwnProps {
  message: string;
}

type Props = FCProps<OwnProps>;

function BlockUnsaved(props: Props) {
  console.log(useFragmentValue());
  return <Prompt message={props.message} />;
}

export default BlockUnsaved;
