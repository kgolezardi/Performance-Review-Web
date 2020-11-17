import React from 'react';
import {
  Brand,
  BrandRegion,
  ContentRegion,
  DashboardLayout,
  NavBarMenu,
  NavbarRegion,
} from 'src/shared/layouts/dashboard-layouts';
import { NavbarMenuItem } from 'src/shared/layouts/dashboard-layouts/menu/types';
import { i18n } from '@lingui/core';
import { routerDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';

import { FullPageError } from './FullPageError';

const items: NavbarMenuItem[] = [
  {
    text: i18n._('Criteria'),
    link: {
      to: '/criteria',
    },
  },
  {
    text: i18n._('Strengths and Weaknesses'),
    link: {
      to: '/strengths-weaknesses',
    },
  },
  {
    text: i18n._('Projects'),
    link: {
      to: '/projects',
    },
  },
];

storiesOf('Full Page Error', module)
  .addDecorator(routerDecorator())
  .add('default', () => <FullPageError />)
  .add('with navbar', () => (
    <DashboardLayout>
      <BrandRegion>
        {/* TODO: add logo here */}
        <Brand label={i18n._('Performance Review')} logo={''} />
      </BrandRegion>
      <NavbarRegion>
        <NavBarMenu items={items} />
      </NavbarRegion>
      <ContentRegion>
        <FullPageError />
      </ContentRegion>
    </DashboardLayout>
  ));
