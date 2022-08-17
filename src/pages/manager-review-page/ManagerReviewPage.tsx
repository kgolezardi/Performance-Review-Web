import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { Box, Container, Divider, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { FormChangeDetector } from 'src/shared/form-change-detector';
import { FormChangePrompt } from 'src/shared/form-change-prompt';
import { FullPageSpinner } from 'src/shared/loading';
import { InView } from 'src/shared/in-view';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { PrintButton } from 'src/shared/print-button';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { TopStickyCard } from 'src/shared/top-sticky-card';
import { i18n } from '@lingui/core';
import { useLazyLoadQuery } from 'react-relay/hooks';

import ManagerReviewDominantCharacteristics from './dominant-characteristics/ManagerReviewDominantCharacteristics';
import ManagerReviewOverallEvaluation from './overall-evaluation';
import { ManagerReviewAchievements } from './achievements';
import { ManagerReviewPageQuery } from './__generated__/ManagerReviewPageQuery.graphql';

const query = graphql`
  query ManagerReviewPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
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
  const { tab = 'achievements', uid } = useParams<Params>();
  const toPrefix = '/manager-review/' + uid;
  const revieweeId = unescape(uid);

  const data = useLazyLoadQuery<ManagerReviewPageQuery>(query, { id: revieweeId });

  if (!data.viewer.user) {
    // TODO: handle this
    return <div>No user found</div>;
  }

  return (
    <FormChangeDetector>
      <FormChangePrompt message={i18n._('Changes you made may not be saved.')} />
      <Box py="1px">
        <Container maxWidth="md">
          <InView>
            <TopStickyCard>
              <PersonInfoCardHeader user={data.viewer.user} />
              <Divider />
              <Tabs value={tab}>
                <TabLink label={i18n._('Achievements')} value="achievements" to={toPrefix + '/achievements'} />
                <TabLink
                  label={i18n._('Dominant Characteristics')}
                  value="dominant-characteristics"
                  to={toPrefix + '/dominant-characteristics'}
                />
                <TabLink
                  label={i18n._('Overall Evaluation')}
                  value="overall-evaluation"
                  to={toPrefix + '/overall-evaluation'}
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
                    children={<ManagerReviewDominantCharacteristics revieweeId={revieweeId} />}
                  />
                  <Route
                    path={toPrefix + '/achievements'}
                    children={<ManagerReviewAchievements revieweeId={revieweeId} />}
                  />
                  <Route
                    path={toPrefix + '/overall-evaluation'}
                    children={<ManagerReviewOverallEvaluation revieweeId={revieweeId} />}
                  />
                  <Redirect to={toPrefix + '/achievements'} />
                </Switch>
              </Suspense>
            </Paper>
          </Box>
        </Container>
      </Box>
      <PrintButton printSrc={`/print-manager-review/${revieweeId}`} id="print-manager-review" />
    </FormChangeDetector>
  );
}
