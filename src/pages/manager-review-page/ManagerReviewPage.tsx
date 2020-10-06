import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { Box, Container, Divider, Paper } from '@material-ui/core';
import { CriteriaOutput } from 'src/shared/criteria-output';
import { DominantCharacteristicsOutput } from 'src/shared/dominant-characteristics-output';
import { FCProps } from 'src/shared/types/FCProps';
import { FullPageSpinner } from 'src/shared/loading';
import { InView } from 'src/shared/in-view';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { PromptProvider } from 'src/shared/prompt';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { TopStickyCard } from 'src/shared/top-sticky-card';
import { i18n } from '@lingui/core';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewPageQuery } from './__generated__/ManagerReviewPageQuery.graphql';
import { ManagerReviewProjects } from './ManagerReviewProjects';

const query = graphql`
  query ManagerReviewPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReview {
          ...DominantCharacteristicsOutput_review
          ...CriteriaOutput_review
        }
        projectReviews {
          ...ManagerReviewProjects_reviews
        }
        ...PersonInfoCardHeader_user
      }
    }
  }
`;

interface Params {
  uid: string;
  tab?: string;
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function ManagerReviewPage(props: Props) {
  const { tab, uid } = useParams<Params>();
  const toPrefix = '/manager-review/' + uid;
  const revieweeId = unescape(uid);

  const data = useLazyLoadQuery<ManagerReviewPageQuery>(query, { id: revieweeId });

  if (!data.viewer.user) {
    // TODO: handle this
    return <div>No user found</div>;
  }

  return (
    <PromptProvider message={i18n._('Changes you made may not be saved.')}>
      <Container maxWidth="md">
        <InView>
          <TopStickyCard>
            <PersonInfoCardHeader user={data.viewer.user} />
            <Divider />
            <Tabs value={tab}>
              <TabLink
                label={i18n._('Performance Competencies')}
                value="performance-competencies"
                to={toPrefix + '/performance-competencies'}
              />
              <TabLink
                label={i18n._('Dominant Characteristics')}
                value="dominant-characteristics"
                to={toPrefix + '/dominant-characteristics'}
              />
              <TabLink label={i18n._('Achievements')} value="achievements" to={toPrefix + '/achievements'} />
            </Tabs>
          </TopStickyCard>
        </InView>
        <Box marginY={2}>
          <Paper>
            <Suspense
              fallback={
                <Box height={200}>
                  <FullPageSpinner />
                </Box>
              }
            >
              <Switch>
                <Route
                  path={toPrefix + '/performance-competencies'}
                  children={<CriteriaOutput review={data.viewer.user?.personReview ?? null} />}
                />
                <Route
                  path={toPrefix + '/dominant-characteristics'}
                  children={<DominantCharacteristicsOutput review={data.viewer.user?.personReview ?? null} />}
                />
                <Route
                  path={toPrefix + '/achievements'}
                  children={<ManagerReviewProjects reviews={data.viewer.user?.projectReviews ?? null} />}
                />
                <Redirect to={toPrefix + '/performance-competencies'} />
              </Switch>
            </Suspense>
          </Paper>
        </Box>
      </Container>
    </PromptProvider>
  );
}
