import { i18n } from '@lingui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { routerDecorator } from 'src/stories/decorators/routerDecorator';
import { Lorem } from 'src/stories/helpers/Lorem';
import { Brand, BrandRegion, ContentRegion, DashboardLayout, NavBarMenu, NavbarRegion } from '.';
import { MenuItem } from './menu/types';

const items: MenuItem[] = [
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
  .addDecorator(themeDecorator())
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
