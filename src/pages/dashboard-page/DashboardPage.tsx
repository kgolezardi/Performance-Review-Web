import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { DashboardPageQuery } from 'src/pages/dashboard-page/__generated__/DashboardPageQuery.graphql';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { AchievementsIndicators } from './AchievementsIndicators';
import { DominantCharacteristicsCircularIndicator } from './DominantCharacteristicsCircularIndicator';
import { LinkButton } from './LinkButton';
import { PerformanceCompetenciesCircularIndicator } from './PerformanceCompetenciesCircularIndicator';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

const query = graphql`
  query DashboardPageQuery($id: ID!) {
    viewer {
      review: findPersonReview(revieweeId: $id) {
        ...PerformanceCompetenciesCircularIndicator_review
        ...DominantCharacteristicsCircularIndicator_review
      }
      projects: projectReviews {
        ...AchievementsIndicators_projects
      }
    }
  }
`;

export default function DashboardPage(props: Props) {
  const classes = useStyles(props);

  const { id } = useAuthGuardUser();

  const data = useLazyLoadQuery<DashboardPageQuery>(query, { id });

  return (
    <Container maxWidth="md">
      <Box marginY={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card classes={{ root: classes.progressCard }}>
              <CardHeader
                title={i18n._('Performance Competencies')}
                action={<LinkButton to="/performance-competencies" />}
                classes={{ action: classes.cardHeaderAction }}
              />
              <CardContent classes={{ root: classes.centerCardContent }}>
                <PerformanceCompetenciesCircularIndicator review={data.viewer.review} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card classes={{ root: classes.progressCard }}>
              <CardHeader
                title={i18n._('Dominant Characteristics')}
                action={<LinkButton to="/dominant-characteristics" />}
                classes={{ action: classes.cardHeaderAction }}
              />
              <CardContent classes={{ root: classes.centerCardContent }}>
                <DominantCharacteristicsCircularIndicator review={data.viewer.review} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card classes={{ root: clsx(classes.progressCard, classes.achievementsCard) }}>
              <CardHeader
                title={i18n._('Achievements')}
                action={<LinkButton to="/achievements" />}
                classes={{ root: classes.achievementsHeader, action: classes.cardHeaderAction }}
              />
              <CardContent classes={{ root: classes.achievementsContent }}>
                <AchievementsIndicators projects={data.viewer.projects} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const styles = (theme: Theme) => ({
  progressCard: {
    height: 360,
  } as CSSProperties,
  centerCardContent: {
    display: 'flex',
    justifyContent: 'center',
  } as CSSProperties,
  achievementsCard: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
  achievementsHeader: {
    flex: 0,
  } as CSSProperties,
  achievementsContent: {
    flex: 1,
    overflow: 'auto',
  } as CSSProperties,
  cardHeaderAction: {
    marginTop: 0,
  },
});

const useStyles = makeStyles(styles, { name: 'DashboardPage' });
type StyleProps = Styles<typeof styles>;
