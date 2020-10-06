import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { CardHeader, CardHeaderProps, Theme, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useFragment } from 'react-relay/hooks';

import { CardHeaderUserAvatar } from './CardHeaderUserAvatar';
import { PersonInfoCardHeader_user$key } from './__generated__/PersonInfoCardHeader_user.graphql';

const fragment = graphql`
  fragment PersonInfoCardHeader_user on UserNode {
    id
    ...getUserLabel_user
    ...CardHeaderUserAvatar_user
  }
`;

interface OwnProps extends CardHeaderProps {
  user: PersonInfoCardHeader_user$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function PersonInfoCardHeader(props: Props) {
  const { user: _, ...rest } = props;
  const classes = useStyles(props);

  const user = useFragment<PersonInfoCardHeader_user$key>(fragment, props.user);

  return (
    <CardHeader
      title={getUserLabel(user)}
      avatar={<CardHeaderUserAvatar user={user} />}
      titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
      {...rest}
      classes={{ root: classes.root, action: classes.action }}
    />
  );
}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 6),
  } as CSSProperties,
  action: {
    margin: 0,
    alignSelf: 'center',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PersonInfoCardHeader' });
type StyleProps = Styles<typeof styles>;
