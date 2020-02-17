import { i18n } from '@lingui/core';
import { Avatar, Button, Card, CardContent, CardHeader, Divider, makeStyles, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  avatar?: string;
  name: string;
  subheader: string;
  onComplete: () => void;
  completed?: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function PersonInfoCard(props: Props) {
  const { avatar, name, subheader, children, onComplete, completed = false } = props;
  const classes = useStyles(props);

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader
        title={name}
        subheader={subheader}
        action={
          <Button onClick={onComplete} variant="contained" color="secondary" disabled={!completed}>
            {i18n._('Done')}
          </Button>
        }
        avatar={
          <Avatar className={classes.avatar} src={avatar}>
            {name[0]}
          </Avatar>
        }
        titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
        classes={{ root: classes.headerRoot, action: classes.action }}
      />
      <Divider variant="middle" />
      <CardContent classes={{ root: classes.content }}>{children}</CardContent>
    </Card>
  );
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
  headerRoot: {
    padding: theme.spacing(3, 6),
  } as CSSProperties,
  avatar: {
    backgroundColor: red[500],
    width: 80,
    height: 80,
  } as CSSProperties,
  action: {
    margin: 0,
    alignSelf: 'center',
  } as CSSProperties,
  content: {
    padding: theme.spacing(),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PersonInfoCard' });
type StyleProps = Styles<typeof styles>;
