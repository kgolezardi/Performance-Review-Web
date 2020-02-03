import { i18n } from '@lingui/core';
import React, { Suspense } from 'react';
import logo from 'src/assets/logo.png';
import { useAuthGuardUser } from 'src/core/auth';
import { useAppSettings } from 'src/core/settings';
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
import { FullPageSpinner } from 'src/shared/loading';
import { FCProps } from 'src/shared/types/FCProps';
import { getMenuItems } from './getMenuItems';
import { MainRoutes } from './MainRoutes';
import { NavbarUser } from './NavbarUser';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function MainContainer(props: Props) {
  const user = useAuthGuardUser();

  const { phase } = useAppSettings();

  return (
    <DashboardLayout>
      <BrandRegion>
        <Brand label={i18n._('Performance Review')} logo={logo} />
      </BrandRegion>
      <NavbarRegion>
        <NavBarMenu items={getMenuItems(phase, user)} />
      </NavbarRegion>
      <ContentRegion>
        <ErrorBoundary fallback={<FullPageError />}>
          <Suspense fallback={<FullPageSpinner />}>
            <MainRoutes />
          </Suspense>
        </ErrorBoundary>
      </ContentRegion>
      <UserRegion>
        <NavbarUser />
      </UserRegion>
    </DashboardLayout>
  );
}
