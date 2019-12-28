import { i18n } from '@lingui/core';
import React, { Suspense } from 'react';
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
import sahabLogo from 'src/assets/sahab-logo.png';

interface OwnProps {}

type Props = FCProps<OwnProps>;

const items: MenuItem[] = [
  {
    text: 'شایستگی‌های عملکردی',
    link: {
      to: '/criteria',
    },
  },
  {
    text: 'ویژگی‌های بارز',
    link: {
      to: '/strengths-weaknesses',
    },
  },
  {
    text: 'دستاوردها',
    link: {
      to: '/projects',
    },
  },
  {
    text: i18n._('Guide'),
    link: {
      to: '/guide',
    },
  },
];

export function MainContainer(props: Props) {
  return (
    <DashboardLayout>
      <BrandRegion>
        <Brand label={i18n._('Performance Review')} logo={sahabLogo} />
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
