import { useFormChangeDetectorContext } from './FormChangeDetectorContext';

export const useFormDirty = () => {
  const { dirty = true } = useFormChangeDetectorContext() ?? {};
  return dirty;
};
