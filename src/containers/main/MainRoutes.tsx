import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';

const DashboardPage = React.lazy(() => import('src/pages/dashboard-page/DashboardPage'));
const CriteriaPage = React.lazy(() => import('src/pages/criteria-page/CriteriaPage'));
const StrengthsWeaknessesPage = React.lazy(() => import('src/pages/strengths-weaknesses-page/StrengthsWeaknessesPage'));
const ProjectsPage = React.lazy(() => import('src/pages/projects-page/ProjectsPage'));
const GuidePage = React.lazy(() => import('src/pages/guide-page/GuidePage'));

interface Props {}

export function MainRoutes(props: FCProps<Props>) {
  return (
    <Switch>
      <Route path="/" exact component={DashboardPage} />
      <Route path="/performance-competencies" component={CriteriaPage} />
      <Route path="/dominant-characteristics" component={StrengthsWeaknessesPage} />
      <Route path="/achievements" component={ProjectsPage} />
      <Route path="/guide" component={GuidePage} />
    </Switch>
  );
}
