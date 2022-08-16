import React from 'react';
import clsx from 'clsx';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { UserAvatar } from 'src/shared/user-avatar';
import { useFragment } from 'react-relay/hooks';
import { useInViewContext } from 'src/shared/in-view';

import { CardHeaderUserAvatar_user$key } from './__generated__/CardHeaderUserAvatar_user.graphql';

const fragment = graphql`
  fragment CardHeaderUserAvatar_user on UserNode {
    ...UserAvatar_user
  }
`;

interface OwnProps {
  user: CardHeaderUserAvatar_user$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function CardHeaderUserAvatar(props: Props) {
  const classes = useStyles(props);
  const { topInView } = useInViewContext();
  const shrink = !topInView;

  const user = useFragment<CardHeaderUserAvatar_user$key>(fragment, props.user);

  return <UserAvatar user={user} className={clsx(classes.root, { [classes.shrink]: shrink })} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 80,
      height: 80,
      transition: theme.transitions.create(['width', 'height']),
      '@media print': {
        display: 'none !important',
      },
    },
    shrink: {
      width: 48,
      height: 48,
    },
  });

const useStyles = makeStyles(styles, { name: 'CardHeaderUserAvatar' });
type StyleProps = Styles<typeof styles>;
