import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { MainContainer } from './containers/main/MainContainer';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AppRouter(props: Props) {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainContainer} />
      </Switch>
    </Router>
  );
}
