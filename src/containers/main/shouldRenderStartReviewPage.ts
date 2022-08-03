import type { UserContextValue } from 'src/core/auth/UserContext';
import { Phase } from 'src/__generated__/enums';

export const shouldRenderStartReviewPage = (user: UserContextValue, phase: Phase) => {
  if (phase === 'MANAGER_REVIEW') {
    if (!(user.isManager || user.isHr)) {
      return false;
    }
  }
  return !user.hasStarted;
};
