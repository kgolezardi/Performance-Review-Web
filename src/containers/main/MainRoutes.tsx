import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { DashboardPage } from 'src/pages/dashboard-page/DashboardPage';
import { FCProps } from 'src/shared/types/FCProps';

interface Props {}

export function MainRoutes(props: FCProps<Props>) {
  return (
    <Switch>
      <Route path="/" exact component={DashboardPage} />
    </Switch>
  );
}
