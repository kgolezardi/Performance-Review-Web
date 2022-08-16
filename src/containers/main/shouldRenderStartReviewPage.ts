import { Phase } from 'src/__generated__/enums';
import type { UserContextValue } from 'src/core/auth/UserContext';

export const shouldRenderStartReviewPage = (user: UserContextValue, phase: Phase) => {
  if (phase === 'MANAGER_REVIEW' || phase === 'MANAGER_ADJUSTMENT') {
    if (!(user.isManager || user.isHr)) {
      return false;
    }
  }
  return !user.hasStarted;
};
