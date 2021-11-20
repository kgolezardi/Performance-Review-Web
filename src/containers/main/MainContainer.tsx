import logo from 'src/assets/logo-light.png';
import React, { Suspense, useMemo } from 'react';
import {
  Brand,
  BrandRegion,
  ContentRegion,
  DashboardLayout,
  NavBarMenu,
  NavbarRegion,
  UserRegion,
} from 'src/shared/layouts/dashboard-layouts';
import { ErrorBoundary } from 'src/shared/error-boundary';
import { FCProps } from 'src/shared/types/FCProps';
import { FullPageError } from 'src/shared/full-page-error';
import { FullPageSpinner } from 'src/shared/loading';
import { i18n } from '@lingui/core';
import { useAppSettings } from 'src/core/settings';
import { useAuthGuardUser } from 'src/core/auth';

import { MainRoutes } from './MainRoutes';
import { NavbarUser } from './NavbarUser';
import { getMenuItems } from './getMenuItems';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function MainContainer(props: Props) {
  const { hasStarted, isManager } = useAuthGuardUser();

  const { phase, logoUrl } = useAppSettings();

  const items = useMemo(() => getMenuItems(phase, { isManager, hasStarted: hasStarted || false }), [
    isManager,
    hasStarted,
    phase,
  ]);

  return (
    <DashboardLayout>
      <BrandRegion>
        <Brand label={i18n._('Performance Review')} logo={logoUrl ?? logo} />
      </BrandRegion>
      <NavbarRegion>
        <NavBarMenu items={items} />
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
