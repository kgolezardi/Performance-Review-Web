import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  value: number;
}

type Props = FCProps<OwnProps> & StyleProps;

export function NumberOutput(props: Props) {
  const classes = useStyles(props);

  const { value } = props;

  const { direction } = useTheme();

  return (
    <span className={clsx({ [classes.ltr]: direction === 'ltr', [classes.rtl]: direction === 'rtl' })}>{value}</span>
  );
}

const styles = (theme: Theme) => ({
  ltr: {} as CSSProperties,
  rtl: {
    fontFamily: 'Shabnam FD',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'NumberOutput' });
type StyleProps = Styles<typeof styles>;
