import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuthGuardUser } from 'src/core/auth';
import { useAppSettings } from 'src/core/settings';
import { StartReviewPage } from 'src/pages/start-review-page/StartReviewPage';
import { FCProps } from 'src/shared/types/FCProps';

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
const GuidePage = React.lazy(() =>
  import(
    /* webpackChunkName: "guide-page" */
    'src/pages/guide-page/GuidePage'
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

interface Props {}

export function MainRoutes(props: FCProps<Props>) {
  const user = useAuthGuardUser();

  const { phase } = useAppSettings();

  if (phase === 'SELF_REVIEW') {
    if (!user.hasStarted) {
      return <StartReviewPage />;
    }
    return (
      <Switch>
        <Route path="/" exact children={<DashboardPage />} />
        <Route path="/self-review/:tab?" children={<SelfReviewPage />} />
        <Route path="/faq" children={<GuidePage />} />
      </Switch>
    );
  }

  if (phase === 'MANAGER_REVIEW' && user.isManager) {
    return (
      <Switch>
        <Route path="/" children={<ManagerReviewPage />} />;
      </Switch>
    );
  }

  // TODO support other phases

  return <IdlePage />;
}
