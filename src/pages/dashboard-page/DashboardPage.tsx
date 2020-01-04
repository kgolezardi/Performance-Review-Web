import { i18n } from '@lingui/core';
import { Box, Card, CardContent, CardHeader, Container, Grid } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { DashboardPageQuery } from 'src/pages/dashboard-page/__generated__/DashboardPageQuery.graphql';
import { FCProps } from 'src/shared/types/FCProps';
import { DominantCharacteristicsCircularIndicator } from './DominantCharacteristicsCircularIndicator';
import { PerformanceCompetenciesCircularIndicator } from './PerformanceCompetenciesCircularIndicator';

interface OwnProps {}

type Props = FCProps<OwnProps>;

const query = graphql`
  query DashboardPageQuery($id: ID!) {
    viewer {
      review: findPersonReview(revieweeId: $id) {
        ...PerformanceCompetenciesCircularIndicator_review
        ...DominantCharacteristicsCircularIndicator_review
      }
    }
  }
`;

export default function DashboardPage(props: Props) {
  const { id } = useAuthGuardUser();

  const data = useLazyLoadQuery<DashboardPageQuery>(query, { id });

  return (
    <Container maxWidth="md">
      <Box marginY={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card>
              <CardHeader title={i18n._('Performance Competencies')} />
              <CardContent>
                <PerformanceCompetenciesCircularIndicator review={data.viewer.review} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardHeader title={i18n._('Dominant Characteristics')} />
              <CardContent>
                <DominantCharacteristicsCircularIndicator review={data.viewer.review} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
