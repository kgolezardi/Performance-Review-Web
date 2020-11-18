import { useEffect } from 'react';

import { useFormChangeDetectorContext } from './FormChangeDetectorContext';

export function useFormChanged(id: string, dirty: boolean) {
  const context = useFormChangeDetectorContext();

  useEffect(() => {
    context?.setDirty(id, dirty);
    return () => {
      if (dirty) {
        context?.setDirty(id, false);
      }
    };
  }, [id, dirty, context]);
}
