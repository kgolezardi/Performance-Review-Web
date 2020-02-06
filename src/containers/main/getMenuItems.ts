import { i18n } from '@lingui/core';
import { Phase } from 'src/core/settings/__generated__/SettingsProviderQuery.graphql';
import { MenuItem } from 'src/shared/layouts/dashboard-layouts/menu/types';
interface User {
  hasStarted: boolean;
  isManager: boolean;
}

export function getMenuItems(phase: Phase, user: User): MenuItem[] {
  if (phase === 'SELF_REVIEW' && user.hasStarted) {
    return [
      {
        text: i18n._('Dashboard'),
        link: {
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
  }
  // TODO support other phases
  return [];
}
