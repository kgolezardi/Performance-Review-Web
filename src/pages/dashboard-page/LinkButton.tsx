import React from 'react';
import { Button, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Link, LinkProps } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';

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
