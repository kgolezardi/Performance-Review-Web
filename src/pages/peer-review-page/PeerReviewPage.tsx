import CriteriaPage from 'src/pages/criteria-page/CriteriaPage';
import StrengthsWeaknessesPage from 'src/pages/strengths-weaknesses-page/StrengthsWeaknessesPage';
import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { Box, Container, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { FullPageSpinner } from 'src/shared/loading';
import { InView } from 'src/shared/in-view';
import { PromptProvider } from 'src/shared/prompt';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { i18n } from '@lingui/core';
import { unescape } from 'src/shared/utils/base64.util';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { PeerReviewPageQuery } from './__generated__/PeerReviewPageQuery.graphql';
import { PeerReviewProjectsTab } from './projectsTab/PeerReviewProjectsTab';
import { PersonInfoCard } from './PersonInfoCard';

const peerReviewPageQuery = graphql`
  query PeerReviewPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        ...PersonInfoCard_user
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

export default function PeerReviewPage(props: Props) {
  const { tab, uid } = useParams<Params>();
  const toPrefix = '/peer-review/' + uid;
  const revieweeId = unescape(uid);

  const data = useLazyLoadQuery<PeerReviewPageQuery>(peerReviewPageQuery, { id: revieweeId });

  if (!data.viewer.user) {
    // TODO: handle this
    return <div>No user found</div>;
  }

  return (
    <PromptProvider message={i18n._('Changes you made may not be saved.')}>
      <Container maxWidth="md">
        <InView>
          <PersonInfoCard user={data.viewer.user}>
            <Tabs value={tab ?? 'performance-competencies'}>
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
          </PersonInfoCard>
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
                  children={<CriteriaPage revieweeId={revieweeId} />}
                />
                <Route
                  path={toPrefix + '/dominant-characteristics'}
                  children={<StrengthsWeaknessesPage revieweeId={revieweeId} />}
                />
                <Route path={toPrefix + '/achievements'} children={<PeerReviewProjectsTab revieweeId={revieweeId} />} />
                <Redirect to={toPrefix + '/performance-competencies'} />
              </Switch>
            </Suspense>
          </Paper>
        </Box>
      </Container>
    </PromptProvider>
  );
}
