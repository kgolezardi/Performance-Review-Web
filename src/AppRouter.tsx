import React, { Suspense, useMemo } from 'react';
import { MainContainer } from 'src/containers/main';
import { AuthGuard } from 'src/core/auth';
import { SettingsProvider } from 'src/core/settings';
import { useConfirmContext } from 'src/shared/confirm-provider';
import { ErrorBoundary } from 'src/shared/error-boundary';
import { FullPageError } from 'src/shared/full-page-error';
import { FullPageSpinner } from 'src/shared/loading';
import { BrowserRouter as Router } from 'src/shared/router';
import { FCProps } from 'src/shared/types/FCProps';

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
              <MainContainer />
            </AuthGuard>
          </SettingsProvider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
