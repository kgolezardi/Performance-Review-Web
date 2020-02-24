import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useTabPanelsContext } from './TabPanels';

interface OwnProps {
  value: number;
}

type Props = FCProps<OwnProps>;

export function TabPanel(props: Props) {
  const { value, children } = props;
  const { value: selectedTab } = useTabPanelsContext();

  if (value === selectedTab) {
    return <Fragment>{children}</Fragment>;
  }
  return null;
}
