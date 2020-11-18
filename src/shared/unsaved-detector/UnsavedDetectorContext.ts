import { createContext, useContext } from 'react';

export interface UnsavedDetectorContextType {
  setUnsaved: (id: string, state: boolean) => void;
  unsaved: boolean;
}
export const UnsavedDetectorContext = createContext<UnsavedDetectorContextType | null>(null);

export function useUnsavedDetectorContext(): UnsavedDetectorContextType | null {
  const context = useContext(UnsavedDetectorContext);
  return context;
}
