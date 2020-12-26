import React, { useContext } from 'react';

import { User } from './User';

export const UserContext = React.createContext<User | null>(null);

export function useUser(): User | null {
  return useContext(UserContext);
}

export function useAuthGuardUser(): User {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuthGuardUser must be used inside the AuthGuard');
  }
  return context;
}
