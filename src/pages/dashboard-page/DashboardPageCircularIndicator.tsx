import React, { ComponentProps } from 'react';
import { CircularProgress } from 'src/shared/progress/CircularProgress';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends ComponentProps<typeof CircularProgress> {}

type Props = FCProps<OwnProps>;

export function DashboardPageCircularIndicator(props: Props) {
  const { children, value, size = 250, thickness = 2 } = props;
  return (
    <CircularProgress {...props} size={size} value={value} thickness={thickness}>
      {children}
    </CircularProgress>
  );
}
