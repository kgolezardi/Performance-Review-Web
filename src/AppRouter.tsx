import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthGuard } from 'src/core/auth/AuthGuard';
import { FullPageSpinner } from 'src/pages/loading/FullPageSpinner';
import { FCProps } from 'src/shared/types/FCProps';
import { MainContainer } from './containers/main/MainContainer';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AppRouter(props: Props) {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Router>
        <AuthGuard>
          <Switch>
            <Route path="/" component={MainContainer} />
          </Switch>
        </AuthGuard>
      </Router>
    </Suspense>
  );
}
