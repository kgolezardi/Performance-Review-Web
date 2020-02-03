import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  value: number;
  index: number;
}

type Props = FCProps<OwnProps>;

export function TabPanel(props: Props) {
  const { value, index, children } = props;
  if (value === index) {
    return <Fragment>{children}</Fragment>;
  }
  return null;
}
