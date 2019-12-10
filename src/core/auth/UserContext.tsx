import React, { useContext } from 'react';
export interface UserContextValue {
  id: string;
  username: string;
}
export const UserContext = React.createContext<UserContextValue | null>(null);

export function useUser() {
  return useContext(UserContext);
}
