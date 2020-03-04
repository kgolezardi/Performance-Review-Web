import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Card, CardContent, CardHeader, Theme, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function NoPeerReviewPage(props: Props) {
  const classes = useStyles(props);
  const user = useAuthGuardUser();

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader title={i18n._('Dear {name}, Hello', { name: getUserLabel(user) })} />
      <CardContent>
        {/* TODO: add text here */}
        No Review for you
      </CardContent>
    </Card>
  );
}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(6),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'NoPeerReview' });
type StyleProps = Styles<typeof styles>;
