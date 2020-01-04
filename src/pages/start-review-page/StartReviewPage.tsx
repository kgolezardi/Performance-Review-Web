import { i18n } from '@lingui/core';
import { Box, Container, makeStyles, Theme, Typography, Button, Grid } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import React, { useContext, useCallback } from 'react';
import { useAuthGuardUser } from 'src/core/auth';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useStartReviewMutation } from './start-review.mutation';

const Content = importMDX.sync('./Content.mdx');

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export const StartReviewPage = (props: Props) => {
  const classes = useStyles(props);
  const components = useContext(MDXContext);
  const user = useAuthGuardUser();
  const startReviewMutation = useStartReviewMutation();
  const startReview = useCallback(() => {
    startReviewMutation({ input: {} });
  }, [startReviewMutation]);
  return (
    <Container maxWidth="md">
      <Box marginY={2} className={classes.startPageBox}>
        <Typography variant="h4" className={classes.welcomeText}>
          {i18n._('Hello dear {name}, Welcome to the performance review system', { name: getUserLabel(user) })}
        </Typography>
        <Content components={components} />
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
  startPageBox: {
    marginTop: theme.spacing(15),
  } as CSSProperties,
  welcomeText: {
    marginBottom: theme.spacing(3.5),
  } as CSSProperties,
  startButtonContainer: {
    marginTop: theme.spacing(7.5),
  },
});

const useStyles = makeStyles(styles, { name: 'StartPage' });
type StyleProps = Styles<typeof styles>;
