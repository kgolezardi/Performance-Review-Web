import nanoid from 'nanoid';
import React, { useCallback, useMemo, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { values } from 'ramda';

import { FormChangeDetectorContext } from './FormChangeDetectorContext';
import { useFormChanged } from './useFormChanged';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function FormChangeDetector(props: Props) {
  const { children } = props;

  const [value, setValue] = useState(() => ({}));
  const [id] = useState(() => nanoid());

  const setDirty = useCallback((id: string, dirty: boolean) => {
    setValue((w) => ({ ...w, [id]: dirty }));
  }, []);
  const dirty = useMemo(() => {
    return values(value).filter(Boolean).length > 0;
  }, [value]);
  const context = useMemo(() => ({ setDirty, dirty }), [setDirty, dirty]);

  useFormChanged(id, dirty);

  return <FormChangeDetectorContext.Provider value={context}>{children}</FormChangeDetectorContext.Provider>;
}
