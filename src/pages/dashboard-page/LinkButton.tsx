import { i18n } from '@lingui/core';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { Link } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  to: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function LinkButton(props: Props) {
  const { to } = props;
  const classes = useStyles(props);
  return (
    <Link to={to} className={classes.root}>
      <Button color="primary" size="small">
        {i18n._('View')}
      </Button>
    </Link>
  );
}

const styles = (theme: Theme) => ({
  root: {
    textDecoration: 'none',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'LinkButton' });
type StyleProps = Styles<typeof styles>;
