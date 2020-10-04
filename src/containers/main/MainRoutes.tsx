import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAppSettings } from 'src/core/settings';
import { useAuthGuardUser } from 'src/core/auth';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { MainRoutesQuery } from './__generated__/MainRoutesQuery.graphql';

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
const GuidePage = React.lazy(() =>
  import(
    /* webpackChunkName: "guide-page" */
    'src/pages/guide-page/GuidePage'
  ),
);
const NvcGuidePage = React.lazy(() =>
  import(
    /* webpackChunkName: "nvc-guide-page" */
    'src/pages/guide-page/NvcGuidePage'
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

const SelfStartReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "self-start-review-page" */
    'src/pages/start-page/SelfStartReviewPage'
  ),
);

const PeerStartReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "peer-start-review-page" */
    'src/pages/start-page/PeerStartReviewPage'
  ),
);

const NoPeerReviewPage = React.lazy(() =>
  import(
    /* webpackChunkName: "peer-no-review-page" */
    'src/pages/start-page/NoPeerReviewPage'
  ),
);

const ResultStartPage = React.lazy(() =>
  import(
    /* webpackChunkName: "result-start-page" */
    'src/pages/start-page/ResultStartPage'
  ),
);

const ResultPage = React.lazy(() =>
  import(
    /* webpackChunkName: "result-page" */
    'src/pages/result-page/ResultPage'
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

  if (phase === 'SELF_REVIEW') {
    if (!user.hasStarted) {
      return <SelfStartReviewPage />;
    }
    return (
      <Switch>
        <Route path="/" exact children={<DashboardPage />} />
        <Route path="/self-review/:tab?" children={<SelfReviewPage />} />
        <Route path="/faq" children={<GuidePage />} />
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
          <Route path="/nvc" children={<NvcGuidePage />} />
        </Switch>
      );
    }
    if (!user.hasStarted) {
      return <PeerStartReviewPage />;
    }
    return (
      <Switch>
        <Redirect exact path="/" to="/peer-review" />
        <Route path="/peer-review/:uid/:tab?" children={<PeerReviewPage />} />
        <Route path="/peer-review/" children={<PeerReviewBoardPage />} />
        <Route path="/nvc" children={<NvcGuidePage />} />
      </Switch>
    );
  }

  if (phase === 'MANAGER_REVIEW' && user.isManager) {
    return (
      <Switch>
        <Redirect exact path="/" to="/manager-review" />
        <Route path="/manager-review/:uid/:tab?" children={<ManagerReviewPage />} />
      </Switch>
    );
  }

  if (phase === 'RESULTS') {
    if (!user.hasStarted) {
      return <ResultStartPage />;
    }
    return (
      <Switch>
        <Route path="/:tab?" children={<ResultPage />} />;
      </Switch>
    );
  }

  return <IdlePage />;
}
