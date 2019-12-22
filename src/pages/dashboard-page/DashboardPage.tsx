import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, CircularProgress, Container, Grid, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { DashboardPageQuery } from 'src/pages/dashboard-page/__generated__/DashboardPageQuery.graphql';
import {
  DashboardPage_review,
  DashboardPage_review$key,
} from 'src/pages/dashboard-page/__generated__/DashboardPage_review.graphql';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

const query = graphql`
  query DashboardPageQuery($id: ID!) {
    viewer {
      review: findPersonReview(revieweeId: $id) {
        ...DashboardPage_review
      }

      # projectReviews {
      #   id
      #   project {
      #     id
      #     name
      #   }
      #   ...AddProjectForm_projectReview
      #   ...ProjectForm_projectReview
      # }
    }
  }
`;

const fragment = graphql`
  fragment DashboardPage_review on PersonReviewNode {
    sahabinessComment
    problemSolvingComment
    executionComment
    thoughtLeadershipComment
    leadershipComment
    presenceComment
    sahabinessRating
    problemSolvingRating
    executionRating
    thoughtLeadershipRating
    leadershipRating
    presenceRating
    strengths
    weaknesses
  }
`;

const calcProgress = (review: DashboardPage_review | null): number => {
  if (review === null) {
    return 0;
  }

  const strengths: ReadonlyArray<any> = review.strengths || [];
  const weaknesses: ReadonlyArray<any> = review.weaknesses || [];

  // TODO improve strengths and weaknesses
  const items = [
    Boolean(review.sahabinessComment),
    Boolean(review.problemSolvingComment),
    Boolean(review.executionComment),
    Boolean(review.thoughtLeadershipComment),
    Boolean(review.leadershipComment),
    Boolean(review.presenceComment),
    Boolean(review.sahabinessRating),
    Boolean(review.problemSolvingRating),
    Boolean(review.executionRating),
    Boolean(review.thoughtLeadershipRating),
    Boolean(review.leadershipRating),
    Boolean(review.presenceRating),
    Boolean(strengths[0]),
    Boolean(strengths[1]),
    Boolean(strengths[2]),
    Boolean(weaknesses[0]),
    Boolean(weaknesses[1]),
    Boolean(weaknesses[3]),
  ];
  return (100 * items.filter(Boolean).length) / items.length;
};

export default function DashboardPage(props: Props) {
  // const classes = useStyles(props);

  const { id } = useAuthGuardUser();

  const data = useLazyLoadQuery<DashboardPageQuery>(query, { id });
  const review = useFragment<DashboardPage_review$key>(fragment, data.viewer.review);

  console.log(review);
  console.log(calcProgress(review));
  const progress = calcProgress(review);
  return (
    <Container maxWidth="sm">
      <Box marginY={2}>
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={i18n._('Progress')} />
              <CardContent>
                <CircularProgress variant="static" value={progress} size={50} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  } as CSSProperties,
});

// const useStyles = makeStyles(styles, { name: 'DashboardPage' });
type StyleProps = Styles<typeof styles>;
