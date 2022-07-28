import { i18n } from '@lingui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { routerDecorator } from 'src/stories/decorators';
import { Lorem } from 'src/stories/helpers';
import { Brand, BrandRegion, ContentRegion, DashboardLayout, NavBarMenu, NavbarRegion } from '.';
import type { NavbarMenuItem } from './menu/types';

const items: NavbarMenuItem[] = [
  {
    text: 'خانه',
    link: {
      to: '/home',
    },
  },
  {
    text: 'کاشانه',
    link: {
      to: '/kashane',
    },
  },
];

storiesOf('Dashboard Layout', module)
  .addDecorator(routerDecorator({ initialEntries: ['/home'] }))
  .add('simple', () => (
    <DashboardLayout>
      <BrandRegion>
        {/* TODO: add logo here */}
        <Brand label={i18n._('Performance Review')} logo={''} />
      </BrandRegion>
      <NavbarRegion>
        <NavBarMenu items={items} />
      </NavbarRegion>
      <ContentRegion>
        <div>
          <Lorem paragraphCount={20} />
        </div>
      </ContentRegion>
    </DashboardLayout>
  ));
