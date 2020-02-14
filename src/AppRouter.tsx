import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthGuard } from 'src/core/auth';
import { SettingsProvider } from 'src/core/settings';
import { ErrorBoundary } from 'src/shared/error-boundary';
import { FullPageError } from 'src/shared/full-page-error';
import { FullPageSpinner } from 'src/shared/loading';
import { FCProps } from 'src/shared/types/FCProps';
import { MainContainer } from './containers/main';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AppRouter(props: Props) {
  return (
    <ErrorBoundary fallback={<FullPageError />}>
      <Suspense fallback={<FullPageSpinner fullHeight />}>
        <Router>
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
