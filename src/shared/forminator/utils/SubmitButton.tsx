import React from 'react';
import { Button } from 'src/shared/button';
import { FCProps } from 'src/shared/types/FCProps';
import { Omit } from '@material-ui/core';

import { useSubmitContext } from '../core/submit/SubmitContext';

interface OwnProps extends Omit<React.ComponentProps<typeof Button>, 'onclick'> {}

type Props = FCProps<OwnProps>;

function SubmitButton(props: Props) {
  const onClick = useSubmitContext();
  return <Button {...props} onClick={onClick} />;
}

export default SubmitButton;
