import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CriteriaPage } from 'src/pages/criteria-page';
import { DashboardPage } from 'src/pages/dashboard-page';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessesPage } from 'src/pages/strengths-weaknesses-page/StrengthsWeaknessesPage';

interface Props {}

export function MainRoutes(props: FCProps<Props>) {
  return (
    <Switch>
      <Route path="/" exact component={DashboardPage} />
      <Route path="/criteria-page" component={CriteriaPage} />
      <Route path="/strengths-weaknesses-page" component={StrengthsWeaknessesPage} />
    </Switch>
  );
}
