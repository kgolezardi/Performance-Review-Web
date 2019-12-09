import { useCallback, useState } from 'react';

export const useLabelWidth = () => {
  const [labelWidth, setLabelWidth] = useState(0);

  const labelRef = useCallback((instance: HTMLSpanElement | null) => {
    if (instance) {
      setLabelWidth(instance.offsetWidth);
    }
  }, []);

  return { labelWidth, labelRef };
};
