import { Phase } from 'src/__generated__/enums';
import type { UserContextValue } from 'src/core/auth/UserContext';

export const shouldRenderStartReviewPage = (user: UserContextValue, phase: Phase) => {
  if (phase === 'MANAGER_REVIEW') {
    if (!user.isManager) {
      return false;
    }
  }
  return !user.hasStarted;
};
