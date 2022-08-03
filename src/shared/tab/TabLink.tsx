import { createStyles, makeStyles, Tab, TabClassKey, TabProps, Theme } from '@material-ui/core';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends TabProps<'a', LinkProps> {}

type Props = FCProps<OwnProps> & StyleProps;

export function TabLink(props: Props) {
  const classes = useStyles(props);

  return <Tab component={Link} {...props} classes={classes} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    labelIcon: {},
    textColorInherit: {},
    textColorPrimary: {},
    textColorSecondary: {},
    selected: {},
    disabled: {},
    fullWidth: {},
    wrapped: {},
    wrapper: {
      fontSize: theme.typography.h6.fontSize,
      '@media print': {
        '$selected &': {
          fontSize: theme.typography.h4.fontSize,
        },
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'TabLink' });
type StyleProps = Styles<TabClassKey>;
