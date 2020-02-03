import React, { useContext } from 'react';

export interface UserContextValue {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  hasStarted: boolean;
  isManager: boolean;
}
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
