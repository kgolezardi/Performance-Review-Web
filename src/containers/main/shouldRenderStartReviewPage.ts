import { Phase } from 'src/__generated__/enums';
import type { User } from 'src/core/auth';

export const shouldRenderStartReviewPage = (user: User, phase: Phase) => {
  if (phase === 'MANAGER_REVIEW') {
    if (!user.isManager) {
      return false;
    }
  }
  return !user.hasStarted;
};
