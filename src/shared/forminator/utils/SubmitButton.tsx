import React from 'react';
import { Button, ButtonProps, Omit } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';

import { useSubmitContext } from '../core/submit/SubmitContext';

interface OwnProps extends Omit<ButtonProps, 'onclick'> {}

type Props = FCProps<OwnProps>;

function SubmitButton(props: Props) {
  const onClick = useSubmitContext();
  return <Button {...props} onClick={onClick} />;
}

export default SubmitButton;
