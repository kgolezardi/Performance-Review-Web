import React, { useCallback } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';

import { ArrayActionType } from './arrayReducer';
import { useArrayContext } from './ArrayContext';
import { useFragmentContext } from '../../core/fragment/FragmentContext';

interface OwnProps extends ButtonProps {}

type Props = FCProps<OwnProps>;

function ArrayRemoveButton(props: Props) {
  const dispatch = useArrayContext();
  const fragment = useFragmentContext();
  const onClick = useCallback(() => {
    dispatch({ type: ArrayActionType.remove, fragment });
  }, [dispatch, fragment]);
  return (
    <Button {...props} onClick={onClick}>
      {props.children}
    </Button>
  );
}

export default ArrayRemoveButton;
