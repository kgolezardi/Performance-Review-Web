import React, { useCallback } from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';

import { ArrayActionType } from './arrayReducer';
import { useArrayContext } from './ArrayContext';

interface OwnProps<V> extends ButtonProps {
  initialValue?: V | undefined;
  prepend?: boolean;
}

type Props<V> = FCProps<OwnProps<V>>;

function ArrayAppendButton<V>({ initialValue, prepend = false, ...props }: Props<V>) {
  const dispatch = useArrayContext();
  const onClick = useCallback(() => {
    if (prepend) {
      dispatch({ type: ArrayActionType.prepend, initialValue });
    } else {
      dispatch({ type: ArrayActionType.append, initialValue });
    }
  }, [dispatch, prepend, initialValue]);
  return (
    <Button {...props} onClick={onClick}>
      {props.children}
    </Button>
  );
}

export default ArrayAppendButton;
