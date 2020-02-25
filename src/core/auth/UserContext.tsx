import React, { useContext } from 'react';

import { AuthGuard_user } from './__generated__/AuthGuard_user.graphql';

export type UserContextValue = AuthGuard_user;
export const UserContext = React.createContext<UserContextValue | null>(null);

export function useUser(): UserContextValue | null {
  return useContext(UserContext);
}

export function useAuthGuardUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuthGuardUser must be used inside the AuthGuard');
  }
  return context;
}
