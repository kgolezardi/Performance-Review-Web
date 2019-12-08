import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React, { useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useArrayContext } from './ArrayContext';
import { ArrayActionType } from './arrayReducer';

interface OwnProps<V> extends ButtonProps {
  initialValue?: V | undefined;
  prepend: boolean;
}

type Props<V> = FCProps<OwnProps<V>>;

function ArrayAppendButton<V>({ initialValue, prepend, ...props }: Props<V>) {
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

ArrayAppendButton.defaultProps = {
  prepend: false,
};

export default ArrayAppendButton;
