import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { useTabPanelsContext } from './TabPanels';

interface OwnProps {
  value: number;
}

type Props = FCProps<OwnProps>;

export function TabPanel(props: Props) {
  const { value, children } = props;
  const currentValue = useTabPanelsContext();

  if (value === currentValue) {
    return <Fragment>{children}</Fragment>;
  }
  return null;
}
