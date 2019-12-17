import React, { useContext, useDebugValue } from 'react';

type OnSubmit = () => Promise<void>;

export const SubmitContext = React.createContext<null | OnSubmit>(null);

export function useSubmitContext<T>(): OnSubmit {
  const onSubmit = useContext(SubmitContext);
  useDebugValue(onSubmit);
  if (onSubmit === null) throw new Error('useSubmitContext only inside RootForm is usable');
  return onSubmit;
}
