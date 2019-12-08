import { path } from 'ramda';
import React, { useEffect } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import FragmentProvider from '../../core/fragment/FragmentProvider';
import { useInitialValue } from '../../core/useInitialValue';
import { useFragmentValue } from '../../core/utils/useFragmentValue';
import { useDictContext } from './DictContext';
import { DictActionType, DictState } from './dictReducer';

interface OwnProps<V> {
  field: string;
  initialValue?: V;
}

type Props<V> = FCProps<OwnProps<V>>;

function DictInputItem<V>(props: Props<V>) {
  const dispatch = useDictContext();
  const dictInitialValue = useInitialValue<V>();

  useEffect(() => {
    const initialValue = path(props.field.split('.'), dictInitialValue);
    dispatch({
      type: DictActionType.createKey,
      key: props.field,
      initialValue:
        initialValue !== undefined ? initialValue : props.initialValue,
    });
    return () => {
      dispatch({ type: DictActionType.deleteKey, key: props.field });
    };
    // `dictInitialValue` and `props.initialValue` variable only used as initial value
    // `dispatch` should be same
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.field]);

  const fragments = useFragmentValue<DictState>();
  if (fragments === undefined || fragments[props.field] === undefined) {
    return null;
  }
  return (
    <FragmentProvider value={fragments[props.field]}>
      {props.children}
    </FragmentProvider>
  );
}

export default DictInputItem;
