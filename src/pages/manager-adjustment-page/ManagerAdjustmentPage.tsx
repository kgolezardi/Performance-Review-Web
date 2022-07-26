import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { Box, Container, Divider, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { FormChangeDetector } from 'src/shared/form-change-detector';
import { FormChangePrompt } from 'src/shared/form-change-prompt';
import { FullPageSpinner } from 'src/shared/loading';
import { InView } from 'src/shared/in-view';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { TabLink } from 'src/shared/tab';
import { Tabs } from 'src/shared/tabs';
import { TopStickyCard } from 'src/shared/top-sticky-card';
import { i18n } from '@lingui/core';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerAdjustmentAchievements } from './achievements/ManagerAdjustmentAchievements';
import { ManagerAdjustmentPageQuery } from './__generated__/ManagerAdjustmentPageQuery.graphql';

const query = graphql`
  query ManagerAdjustmentPageQuery($id: ID!) {
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

export default function ManagerAdjustmentPage(props: Props) {
  const { tab = 'achievements', uid } = useParams<Params>();
  const toPrefix = '/manager-adjustment/' + uid;
  const revieweeId = unescape(uid);

  const data = useLazyLoadQuery<ManagerAdjustmentPageQuery>(query, { id: revieweeId });

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
            <PersonInfoCardHeader user={data.viewer.user} />
            <Divider />
            <Tabs value={tab}>
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
                  path={toPrefix + '/achievements'}
                  children={<ManagerAdjustmentAchievements revieweeId={revieweeId} />}
                />
                <Redirect to={toPrefix + '/achievements'} />
              </Switch>
            </Suspense>
          </Paper>
        </Box>
      </Container>
    </FormChangeDetector>
  );
}
