import * as React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Fragment } from 'react';

import { FragmentLens } from '../core/fragment-lens/FragmentLens';
import { useLensValue } from '../core/fragment-lens/useLensValue';

export type ConditionFunction<V = any> = (value: V) => boolean;

interface OwnProps<V> {
  lens: FragmentLens<V>;
  condition: V | ConditionFunction<V>;
}

function isConditionFunction<C>(condition: C | ConditionFunction<C>): condition is ConditionFunction {
  return typeof condition === 'function';
}

function checkCondition<V>(condition: V | ConditionFunction<V>, value: V | undefined) {
  return isConditionFunction(condition) ? condition(value) : condition === value;
}

type Props<V> = FCProps<OwnProps<V>>;

function ConditionalSection<V>(props: Props<V>) {
  const { lens, condition } = props;
  const value = useLensValue<V>(lens);
  if (checkCondition(condition, value)) {
    return <Fragment>{props.children}</Fragment>;
  }
  return null;
}

export default ConditionalSection;
