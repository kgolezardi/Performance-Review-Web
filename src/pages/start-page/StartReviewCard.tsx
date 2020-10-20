import React, { useCallback, useContext } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid, Theme, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXComponentProps, MDXContext } from '@mdx-js/react';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useAuthGuardUser } from 'src/core/auth';

import { BlackQuote } from './BlackQuote';
import { useStartReviewMutation } from './start-review.mutation';

interface OwnProps {
  Content: React.ComponentType<MDXComponentProps>;
}

type Props = FCProps<OwnProps> & StyleProps;

export function StartReviewCard(props: Props) {
  const { Content } = props;
  const classes = useStyles(props);
  const components = useContext(MDXContext);
  const user = useAuthGuardUser();
  const startReviewMutation = useStartReviewMutation();

  const startReview = useCallback(() => {
    startReviewMutation({ input: {} });
  }, [startReviewMutation]);

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader title={i18n._('Dear {name}, Hello', { name: getUserLabel(user) })} />
      <CardContent>
        <Content components={{ ...components, blockquote: BlackQuote }} />

        <Grid container justify="center">
          <Grid item>
            <Box marginTop={3}>
              <Button variant="contained" color="secondary" size="large" onClick={startReview}>
                {i18n._('Begin my review')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(6),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'StartReviewCard' });
type StyleProps = Styles<typeof styles>;
