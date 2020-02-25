import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Link, LinkProps } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { Tab, TabClassKey, TabProps, Theme, makeStyles } from '@material-ui/core';

interface OwnProps extends TabProps<'a', LinkProps> {}

type Props = FCProps<OwnProps> & StyleProps;

export function TabLink(props: Props) {
  const classes = useStyles(props);

  return <Tab component={Link} {...props} classes={classes} />;
}

const styles = (theme: Theme) => ({
  wrapper: {
    fontSize: theme.typography.h6.fontSize,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'TabLink' });
type StyleProps = Styles<TabClassKey>;
