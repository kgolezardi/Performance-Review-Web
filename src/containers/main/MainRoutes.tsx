import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';

const DashboardPage = React.lazy(() => import('src/pages/dashboard-page/DashboardPage'));
const CriteriaPage = React.lazy(() => import('src/pages/criteria-page/CriteriaPage'));
const StrengthsWeaknessesPage = React.lazy(() => import('src/pages/strengths-weaknesses-page/StrengthsWeaknessesPage'));

interface Props {}

export function MainRoutes(props: FCProps<Props>) {
  return (
    <Switch>
      <Route path="/" exact component={DashboardPage} />
      <Route path="/criteria" component={CriteriaPage} />
      <Route path="/strengths-weaknesses" component={StrengthsWeaknessesPage} />
    </Switch>
  );
}
