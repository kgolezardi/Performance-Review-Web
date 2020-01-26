import { i18n } from '@lingui/core';
import React, { Suspense } from 'react';
import logo from 'src/assets/logo.png';
import { useAuthGuardUser } from 'src/core/auth';
import { useAppSettings } from 'src/core/settings';
import { StartReviewPage } from 'src/pages/start-review-page/StartReviewPage';
import { ErrorBoundary } from 'src/shared/error-boundary';
import { FullPageError } from 'src/shared/full-page-error';
import {
  Brand,
  BrandRegion,
  ContentRegion,
  DashboardLayout,
  NavBarMenu,
  NavbarRegion,
  UserRegion,
} from 'src/shared/layouts/dashboard-layouts';
import { MenuItem } from 'src/shared/layouts/dashboard-layouts/types';
import { FullPageSpinner } from 'src/shared/loading';
import { FCProps } from 'src/shared/types/FCProps';
import { MainRoutes } from './MainRoutes';
import { NavbarUser } from './NavbarUser';

const IdlePage = React.lazy(() =>
  import(
    /* webpackChunkName: "idle-page" */
    'src/pages/idle-page/IdlePage'
  ),
);

interface OwnProps {}

type Props = FCProps<OwnProps>;

const items: MenuItem[] = [
  {
    text: i18n._('Dashboard'),
    link: {
      exact: true,
      to: '/',
    },
  },
  {
    text: i18n._('Self Review'),
    link: {
      to: '/self-review',
    },
  },
  {
    text: i18n._('FAQ'),
    link: {
      to: '/faq',
    },
  },
];

export function MainContainer(props: Props) {
  const user = useAuthGuardUser();

  const { phase } = useAppSettings();

  if (phase === 'IDLE') {
    return <IdlePage />;
  }

  return (
    <DashboardLayout>
      <BrandRegion>
        <Brand label={i18n._('Performance Review')} logo={logo} />
      </BrandRegion>
      <NavbarRegion>
        <NavBarMenu items={user.hasStarted ? items : []} />
      </NavbarRegion>
      <ContentRegion>
        <ErrorBoundary fallback={<FullPageError />}>
          <Suspense fallback={<FullPageSpinner />}>{user.hasStarted ? <MainRoutes /> : <StartReviewPage />}</Suspense>
        </ErrorBoundary>
      </ContentRegion>
      <UserRegion>
        <NavbarUser />
      </UserRegion>
    </DashboardLayout>
  );
}
