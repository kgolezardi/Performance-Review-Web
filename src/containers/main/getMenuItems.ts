import { NavbarMenuItem } from 'src/shared/layouts/dashboard-layouts/menu/types';
import { Phase } from 'src/core/settings/__generated__/SettingsProviderQuery.graphql';
import { i18n } from '@lingui/core';
interface User {
  hasStarted: boolean;
  isManager: boolean;
}

export function getMenuItems(phase: Phase, user: User): NavbarMenuItem[] {
  if (phase === 'SELF_REVIEW' && user.hasStarted) {
    return [
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
        children: [
          {
            link: {
              to: '/self-review/achievements',
            },
            text: i18n._('Achievements'),
          },
          {
            link: {
              to: '/self-review/dominant-characteristics',
            },
            text: i18n._('Dominant Characteristics'),
          },
        ],
      },
    ];
  }
  if (phase === 'PEER_REVIEW' && user.hasStarted) {
    return [
      {
        text: i18n._('Peer Review'),
        link: {
          to: '/peer-review',
        },
      },
    ];
  }
  if (phase === 'MANAGER_REVIEW' && user.hasStarted) {
    return [
      {
        text: i18n._('Dashboard'),
        link: {
          exact: true,
          to: '/manager-review',
        },
      },
    ];
  }
  // TODO support other phases
  return [];
}
