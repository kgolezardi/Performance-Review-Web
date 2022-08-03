import { i18n } from '@lingui/core';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  to: LinkProps['to'];
}

type Props = FCProps<OwnProps> & StyleProps;

export function LinkButton(props: Props) {
  const { to } = props;
  const classes = useStyles(props);
  return (
    <Link to={to} className={classes.root}>
      <Button color="primary" variant="outlined" fullWidth>
        {i18n._('View')}
      </Button>
    </Link>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textDecoration: 'none',
    },
  });

const useStyles = makeStyles(styles, { name: 'LinkButton' });
type StyleProps = Styles<typeof styles>;
