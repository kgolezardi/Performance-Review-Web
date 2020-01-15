import React, { Suspense, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthGuard } from 'src/core/auth';
import { SettingsProvider } from 'src/core/settings';
import { ErrorBoundary } from 'src/shared/error-boundary';
import { FullPageError } from 'src/shared/full-page-error';
import { FullPageSpinner } from 'src/shared/loading';
import { BrowserRouter as Router } from 'src/shared/router';
import { FCProps } from 'src/shared/types/FCProps';
import { MainContainer } from './containers/main';
import { useConfirmContext } from './shared/confirm-provider';

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
              <Switch>
                <Route path="/" component={MainContainer} />
              </Switch>
            </AuthGuard>
          </SettingsProvider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
