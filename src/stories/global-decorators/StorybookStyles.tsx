import * as React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export const StorybookStyles = (props: Props) => {
  const { children } = props;
  const classes = useStyles(props);

  return <div className={classes.root}>{children}</div>;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // Following styles should match GlobalStyles styles
      direction: 'ltr',
    },
  });

const useStyles = makeStyles(styles, { name: 'StorybookStyles' });
