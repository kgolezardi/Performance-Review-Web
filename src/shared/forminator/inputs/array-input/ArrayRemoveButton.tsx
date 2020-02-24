import { Button, ButtonProps } from '@material-ui/core';
import React, { useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useFragmentContext } from '../../core/fragment/FragmentContext';
import { useArrayContext } from './ArrayContext';
import { ArrayActionType } from './arrayReducer';

interface OwnProps<V> extends ButtonProps {}

type Props<V> = FCProps<OwnProps<V>>;

function ArrayRemoveButton<V>(props: Props<V>) {
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
