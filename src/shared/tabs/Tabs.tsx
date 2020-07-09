import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Tabs as MuiTabs, TabsProps as MuiTabsProps, Theme, makeStyles } from '@material-ui/core';

interface OwnProps extends Omit<MuiTabsProps, 'onChange'> {
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void;
}

type Props = FCProps<OwnProps>;

export function Tabs(props: Props) {
  const classes = useStyles(props);
  return <MuiTabs textColor="primary" indicatorColor="primary" centered {...props} classes={classes} />;
}

const styles = (theme: Theme) => ({
  scroller: {
    display: 'block',
  } as CSSProperties,
  indicator: {
    height: theme.spacing(0.5),
    borderRadius: theme.spacing(0.5),
    '@media print': {
      display: 'none',
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Tabs' });

export type TabsProps = Props;
