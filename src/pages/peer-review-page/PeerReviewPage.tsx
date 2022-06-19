import StrengthsWeaknessesPage from 'src/pages/strengths-weaknesses-page/StrengthsWeaknessesPage';
import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { Box, Container, Divider, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { FormChangeDetector } from 'src/shared/form-change-detector';
import { FormChangePrompt } from 'src/shared/form-change-prompt';
import { FullPageSpinner } from 'src/shared/loading';
import { InView } from 'src/shared/in-view';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { TopStickyCard } from 'src/shared/top-sticky-card';
import { i18n } from '@lingui/core';
import { unescape } from 'src/shared/utils/base64.util';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { PeerReviewPageQuery } from './__generated__/PeerReviewPageQuery.graphql';
import { PeerReviewPersonInfoCard } from './PeerReviewPersonInfoCard';
import { PeerReviewProjectsTab } from './projectsTab/PeerReviewProjectsTab';

const peerReviewPageQuery = graphql`
  query PeerReviewPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        ...PeerReviewPersonInfoCard_user
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
    <FormChangeDetector>
      <FormChangePrompt message={i18n._('Changes you made may not be saved.')} />
      <Container maxWidth="md">
        <InView>
          <TopStickyCard>
            <PeerReviewPersonInfoCard user={data.viewer.user} />
            <Divider />

            <Tabs value={tab ?? 'achievements'}>
              <TabLink label={i18n._('Achievements')} value="achievements" to={toPrefix + '/achievements'} />

              <TabLink
                label={i18n._('Dominant Characteristics')}
                value="dominant-characteristics"
                to={toPrefix + '/dominant-characteristics'}
              />
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
                  path={toPrefix + '/dominant-characteristics'}
                  children={<StrengthsWeaknessesPage revieweeId={revieweeId} />}
                />
                <Route path={toPrefix + '/achievements'} children={<PeerReviewProjectsTab revieweeId={revieweeId} />} />
                <Redirect to={toPrefix + '/achievements'} />
              </Switch>
            </Suspense>
          </Paper>
        </Box>
      </Container>
    </FormChangeDetector>
  );
}
