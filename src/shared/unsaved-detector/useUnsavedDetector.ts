import { useEffect } from 'react';

import { useUnsavedDetectorContext } from './UnsavedDetectorContext';

export function useUnsavedDetector(id: string, state: boolean) {
  const context = useUnsavedDetectorContext();
  useEffect(() => {
    context?.setUnsaved(id, state);
    return () => {
      if (state) {
        context?.setUnsaved(id, false);
      }
    };
  }, [id, state, context]);
}
