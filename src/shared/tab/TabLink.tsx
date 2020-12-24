import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Link, LinkProps } from 'react-router-dom';
import { Styles } from 'src/shared/types/Styles';
import { Tab, TabClassKey, TabProps, Theme, createStyles, makeStyles } from '@material-ui/core';

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
