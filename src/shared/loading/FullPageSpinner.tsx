import React from 'react';
import clsx from 'clsx';
import { CircularProgress, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  fullHeight?: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function FullPageSpinner(props: Props) {
  const classes = useStyles(props);
  return (
    <div className={clsx(classes.root, { [classes.fullHeight]: props.fullHeight })}>
      <CircularProgress />
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullHeight: {
      height: '100vh',
    },
  });

const useStyles = makeStyles(styles, { name: 'FullPageSpinner' });
type StyleProps = Styles<typeof styles>;
