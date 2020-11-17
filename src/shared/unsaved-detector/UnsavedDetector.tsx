import nanoid from 'nanoid';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { values } from 'ramda';

export interface UnsavedDetectorContextType {
  setUnsaved: (id: string, state: boolean) => void;
  unsaved: boolean;
}
export const UnsavedDetectorContext = createContext<UnsavedDetectorContextType | null>(null);

export function useUnsavedDetectorContext(): UnsavedDetectorContextType | null {
  const context = useContext(UnsavedDetectorContext);
  return context;
}

export function useUnsavedDetector(id: string, state: boolean) {
  const context = useUnsavedDetectorContext();
  useEffect(() => {
    context?.setUnsaved(id, state);
    return () => {
      if (state /* === true*/) {
        context?.setUnsaved(id, false);
      }
    };
  }, [id, state, context]);
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function UnsavedDetector(props: Props) {
  const { children } = props;

  const [value, setValue] = useState(() => ({}));
  const [id] = useState(() => nanoid());

  const setUnsaved = useCallback((id: string, state: boolean) => {
    setValue((w) => ({ ...w, [id]: state }));
  }, []);
  const unsaved = useMemo(() => {
    return values(value).filter(Boolean).length > 0;
  }, [value]);
  const context = useMemo(() => ({ setUnsaved, unsaved }), [setUnsaved, unsaved]);

  useUnsavedDetector(id, unsaved);

  return <UnsavedDetectorContext.Provider value={context}>{children}</UnsavedDetectorContext.Provider>;
}
