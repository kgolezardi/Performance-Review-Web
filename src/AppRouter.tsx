import React, { Suspense, useMemo } from 'react';
import { AuthGuard } from 'src/core/auth';
import { ErrorBoundary } from 'src/shared/error-boundary';
import { FCProps } from 'src/shared/types/FCProps';
import { FullPageError } from 'src/shared/full-page-error';
import { FullPageSpinner } from 'src/shared/loading';
import { MainContainer } from 'src/containers/main';
import { ResultPrintPage } from 'src/pages/result-page/ResultPrintPage';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'src/shared/router';
import { SettingsProvider } from 'src/core/settings';
import { useConfirmContext } from 'src/shared/confirm-provider';

import { ManagerReviewPrintPage } from './pages/manager-review-page/ManagerReviewPrintPage';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AppRouter(props: Props) {
  const getUserConfirmation = useConfirmContext();
  const routerOptions = useMemo(() => ({ getUserConfirmation }), [getUserConfirmation]);
  return (
    <ErrorBoundary fallback={<FullPageError />}>
      <Suspense fallback={<FullPageSpinner fullHeight />}>
        <Router historyOptions={routerOptions}>
          <SettingsProvider>
            <AuthGuard>
              <div id="game-container" />
              <Switch>
                <Route path="/print" children={<ResultPrintPage />} />
                <Route path="/print-manager-review/:uid" children={<ManagerReviewPrintPage />} />
                <Route children={<MainContainer />} />
              </Switch>
            </AuthGuard>
          </SettingsProvider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
