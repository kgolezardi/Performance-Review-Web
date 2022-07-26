import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAppSettings } from 'src/core/settings';
import { useAuthGuardUser } from 'src/core/auth';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { MainRoutesQuery } from './__generated__/MainRoutesQuery.graphql';
import { shouldRenderStartReviewPage } from './shouldRenderStartReviewPage';

const DashboardPage = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboard-page" */
    'src/pages/dashboard-page/DashboardPage'
  ),
);
const SelfReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "self-review-page" */
    'src/pages/self-review-page/SelfReviewPage'
  ),
);
const PeerReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "peer-review-page" */
    'src/pages/peer-review-page/PeerReviewPage'
  ),
);

const IdlePage = React.lazy(() =>
  import(
    /* webpackChunkName: "idle-page" */
    'src/pages/idle-page/IdlePage'
  ),
);
const ManagerReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "manager-review-page" */
    'src/pages/manager-review-page/ManagerReviewPage'
  ),
);
const PeerReviewBoardPage = React.lazy(() =>
  import(
    /* webpackChunkName: "peer-review-board-page" */
    'src/pages/peer-review-board-page/PeerReviewBoardPage'
  ),
);

const StartReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "start-review-page" */
    'src/pages/start-page/StartReviewPage'
  ),
);

const NoPeerReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "peer-no-review-page" */
    'src/pages/start-page/NoPeerReviewPage'
  ),
);

const ResultPage = React.lazy(() =>
  import(
    /* webpackChunkName: "result-page" */
    'src/pages/result-page/ResultPage'
  ),
);

const ManagerReviewDashboard = React.lazy(() =>
  import(
    /* webpackChunkName: "manager-review-dashboard" */
    'src/pages/manager-review-dashboard/ManagerReviewDashboard'
  ),
);

const ManagerAdjustmentDashboard = React.lazy(() =>
  import(
    /* webpackChunkName: "manager-adjustment-dashboard" */
    'src/pages/manager-adjustment-dashboard/ManagerAdjustmentDashboard'
  ),
);

const ManagerAdjustmentPage = React.lazy(() =>
  import(
    /* webpackChunkName: "manager-adjustment-page" */
    'src/pages/manager-adjustment-page/ManagerAdjustmentPage'
  ),
);

interface Props {}

const query = graphql`
  query MainRoutesQuery {
    viewer {
      usersToReview {
        id
      }
    }
  }
`;

export function MainRoutes(props: FCProps<Props>) {
  const user = useAuthGuardUser();

  const { phase } = useAppSettings();

  const data = useLazyLoadQuery<MainRoutesQuery>(query, {});

  if (phase === 'IDLE') {
    return <IdlePage />;
  }

  if (shouldRenderStartReviewPage(user, phase)) {
    return <StartReviewPage />;
  }

  if (phase === 'SELF_REVIEW') {
    return (
      <Switch>
        <Route path="/" exact children={<DashboardPage />} />
        <Route path="/self-review/:tab?" children={<SelfReviewPage />} />
      </Switch>
    );
  }

  if (phase === 'PEER_REVIEW') {
    const hasSomethingToReview = !!data.viewer.usersToReview.length;

    if (!hasSomethingToReview) {
      return (
        <Switch>
          <Redirect exact path="/" to="/peer-review" />
          <Route path="/peer-review/" children={<NoPeerReviewPage />} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Redirect exact path="/" to="/peer-review" />
        <Route path="/peer-review/:uid/:tab?" children={<PeerReviewPage />} />
        <Route path="/peer-review/" children={<PeerReviewBoardPage />} />
      </Switch>
    );
  }

  if (phase === 'MANAGER_REVIEW' && (user.isManager || user.isHr)) {
    return (
      <Switch>
        <Redirect exact path="/" to="/manager-review" />
        <Route path="/manager-review/:uid/:tab?" children={<ManagerReviewPage />} />
        <Route path="/manager-review" children={<ManagerReviewDashboard />} />
      </Switch>
    );
  }

  if (phase === 'MANAGER_ADJUSTMENT' && (user.isManager || user.isHr)) {
    return (
      <Switch>
        <Redirect exact path="/" to="/manager-adjustment" />
        <Route path="/manager-adjustment/:uid" children={<ManagerAdjustmentPage />} />
        <Route path="/manager-adjustment" children={<ManagerAdjustmentDashboard />} />
      </Switch>
    );
  }

  if (phase === 'RESULTS') {
    return (
      <Switch>
        <Route path="/:tab?" children={<ResultPage />} />;
      </Switch>
    );
  }

  return <IdlePage />;
}
