import React, { useCallback, useContext } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXComponentProps, MDXContext } from '@mdx-js/react';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';

import { useStartReviewMutation } from './start-review.mutation';

interface OwnProps {
  Content: React.ComponentType<MDXComponentProps>;
}

type Props = FCProps<OwnProps>;

export function ResultStartCard(props: Props) {
  const { Content } = props;
  const components = useContext(MDXContext);
  const user = useAuthGuardUser();
  const startReviewMutation = useStartReviewMutation();

  const startReview = useCallback(() => {
    startReviewMutation({ input: {} });
  }, [startReviewMutation]);

  return (
    <Card>
      <Box padding={6}>
        <CardHeader title={i18n._('Dear {name}, Hello', { name: getUserLabel(user) })} />
        <CardContent>
          <Content components={components} />
          <Grid container justifyContent="center">
            <Grid item>
              <Box marginTop={3}>
                <Button variant="contained" color="secondary" size="large" onClick={startReview}>
                  {i18n._('See Review Result')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
}
