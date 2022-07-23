import ReactMarkdown from 'react-markdown';
import React, { useCallback } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { defaultRenderers } from 'src/shared/react-markdown/renderers';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useAppSettings } from 'src/core/settings';
import { useAuthGuardUser } from 'src/core/auth';

import { useStartReviewMutation } from './start-review.mutation';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function StartReviewCard(props: Props) {
  const classes = useStyles(props);
  const user = useAuthGuardUser();
  const { startText } = useAppSettings();
  const startReviewMutation = useStartReviewMutation();

  const startReview = useCallback(() => {
    startReviewMutation({ input: {} });
  }, [startReviewMutation]);

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader title={i18n._('Dear {name}, Hello', { name: getUserLabel(user) })} />
      <CardContent>
        <ReactMarkdown renderers={defaultRenderers}>{startText ?? ''}</ReactMarkdown>
        <Box display="flex" justifyContent="center" marginTop={3}>
          <Box width="240px">
            <Button variant="contained" color="secondary" size="large" fullWidth onClick={startReview}>
              {i18n._('Start')}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(6),
    },
  });

const useStyles = makeStyles(styles, { name: 'StartReviewCard' });
type StyleProps = Styles<typeof styles>;
