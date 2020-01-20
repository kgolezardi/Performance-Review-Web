import { i18n } from '@lingui/core';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
// @ts-ignore
import { Components, MDXContext } from '@mdx-js/react';
import { DateTime } from 'luxon';
import { importMDX } from 'mdx.macro';
import React, { useCallback, useContext } from 'react';
import { useAuthGuardUser } from 'src/core/auth';
import { useAppSettings } from 'src/core/settings';
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
  const settings = useAppSettings();
  const components = useContext<Components>(MDXContext);
  const user = useAuthGuardUser();
  const startReviewMutation = useStartReviewMutation();
  const startReview = useCallback(() => {
    startReviewMutation({ input: {} });
  }, [startReviewMutation]);

  const { dueDate } = settings;

  const formattedDueDate =
    dueDate &&
    DateTime.fromISO(dueDate)
      .reconfigure({ outputCalendar: 'persian' })
      .setLocale('fa')
      .toFormat('EEEE، d MMMM');

  return (
    <Container maxWidth="md">
      <Box marginTop={15}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardHeader title={i18n._('Dear {name}, Hello', { name: getUserLabel(user) })} />
          <CardContent>
            <Content components={{ ...components, blockquote: BlackQuote }} />
            {!!formattedDueDate && (
              <Typography variant="h6" className={classes.dueDate}>
                {i18n._('Evaluation due date: {formattedDueDate}', { formattedDueDate })}
              </Typography>
            )}
            <Grid container justify="center" className={classes.startButtonContainer}>
              <Grid item>
                <Button variant="contained" color="secondary" size="large" onClick={startReview}>
                  {i18n._('Begin my review')}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const styles = (theme: Theme) => ({
  cardRoot: {
    padding: theme.spacing(6),
  } as CSSProperties,
  startButtonContainer: {
    marginTop: theme.spacing(7),
  } as CSSProperties,
  dueDate: {
    marginTop: theme.spacing(3),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'StartPage' });
type StyleProps = Styles<typeof styles>;
