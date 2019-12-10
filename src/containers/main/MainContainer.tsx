import { i18n } from '@lingui/core';
import React, { Suspense } from 'react';
import FullPageError from 'src/pages/full-page-error/FullPageError';
import { FullPageSpinner } from 'src/pages/loading/FullPageSpinner';
import { ErrorBoundary } from 'src/shared/error-boundary';
import {
  Brand,
  BrandRegion,
  ContentRegion,
  DashboardLayout,
  NavBarMenu,
  NavbarRegion,
} from 'src/shared/layouts/dashboard-layouts';
import { MenuItem } from 'src/shared/layouts/dashboard-layouts/menu/types';
import { FCProps } from 'src/shared/types/FCProps';
import { MainRoutes } from './MainRoutes';

interface OwnProps {}

type Props = FCProps<OwnProps>;

const items: MenuItem[] = [];

export function MainContainer(props: Props) {
  return (
    <DashboardLayout>
      <BrandRegion>
        {/* TODO: add logo here */}
        <Brand label={i18n._('Performance Review')} logo={''} />
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
    </DashboardLayout>
  );
}
