import nanoid from 'nanoid';
import React, { useCallback, useMemo, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { values } from 'ramda';

import { UnsavedDetectorContext } from './UnsavedDetectorContext';
import { useUnsavedDetector } from './useUnsavedDetector';

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
