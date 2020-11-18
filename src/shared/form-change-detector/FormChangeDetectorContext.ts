import { createContext, useContext } from 'react';

export interface FormChangeDetectorContextType {
  setDirty: (id: string, dirty: boolean) => void;
  dirty: boolean;
}

export const FormChangeDetectorContext = createContext<FormChangeDetectorContextType | null>(null);

export function useFormChangeDetectorContext(): FormChangeDetectorContextType | null {
  const context = useContext(FormChangeDetectorContext);
  return context;
}
