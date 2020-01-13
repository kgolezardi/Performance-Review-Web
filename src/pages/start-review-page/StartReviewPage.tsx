import { i18n } from '@lingui/core';
import { Box, Button, Container, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
// @ts-ignore
import { Components, MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import React, { useCallback, useContext } from 'react';
import { useAuthGuardUser } from 'src/core/auth';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { BlackQuote } from './BlackQuote';
import { useStartReviewMutation } from './start-review.mutation';

const Content = importMDX.sync('./Content.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export const StartReviewPage = (props: Props) => {
  const classes = useStyles(props);
  const components = useContext<Components>(MDXContext);
  const user = useAuthGuardUser();
  const startReviewMutation = useStartReviewMutation();
  const startReview = useCallback(() => {
    startReviewMutation({ input: {} });
  }, [startReviewMutation]);
  return (
    <Container maxWidth="md">
      <Box marginTop={15}>
        <Typography variant="h4" className={classes.title}>
          {i18n._('Dear {name}, Hello', { name: getUserLabel(user) })}
        </Typography>
        <Content components={{ ...components, blockquote: BlackQuote }} />
        <Grid container justify="center" className={classes.startButtonContainer}>
          <Button variant="contained" color="secondary" size="large" onClick={startReview}>
            {i18n._('Begin my review')}
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

const styles = (theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(6),
  } as CSSProperties,
  startButtonContainer: {
    marginTop: theme.spacing(7.5),
  },
});

const useStyles = makeStyles(styles, { name: 'StartPage' });
type StyleProps = Styles<typeof styles>;
