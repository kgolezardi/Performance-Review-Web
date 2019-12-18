import { i18n } from '@lingui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  Brand,
  BrandRegion,
  ContentRegion,
  DashboardLayout,
  NavBarMenu,
  NavbarRegion,
} from 'src/shared/layouts/dashboard-layouts';
import { MenuItem } from 'src/shared/layouts/dashboard-layouts/menu/types';
import { themeDecorator } from 'src/stories/decorators';
import { FullPageError } from './FullPageError';
import { BrowserRouter as Router } from 'react-router-dom';

const items: MenuItem[] = [
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
  .addDecorator(themeDecorator())
  .add('default', () => <FullPageError />)
  .add('with navbar', () => (
    <>
      <Router>
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
      </Router>
    </>
  ));
