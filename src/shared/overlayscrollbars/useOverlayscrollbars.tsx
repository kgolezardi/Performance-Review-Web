import OverlayScrollbars from 'overlayscrollbars';
import { Ref, useCallback, useLayoutEffect, useState } from 'react';
import { useDeepMemoize } from 'src/shared/utils/deepMemoize';

const defaultOptions: OverlayScrollbars.Options = {
  scrollbars: { autoHide: 'never', autoHideDelay: 100 },
};

export interface ImperativeHandles {
  getOverlayScrollbar: () => OverlayScrollbars | null;
}
/**
 * @function useOverlayScrollbar
 * @note if your element has a display: flex and the scrollbar is not working then:
 * @see https://kingsora.github.io/OverlayScrollbars/#!documentation/flexbox for the fix.
 */
export function useOverlayscrollbars(
  options: OverlayScrollbars.Options = defaultOptions,
): [Ref<HTMLDivElement>, OverlayScrollbars | null] {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const ref = useCallback((element: HTMLDivElement | null) => {
    setElement(element);
  }, []);

  const memoizedOptions = useDeepMemoize(options);
  const [instance, setInstance] = useState<OverlayScrollbars | null>(null);
  // it's important to use "useLayoutEffect" otherwise you will see a flash of un-styled content.
  useLayoutEffect(() => {
    if (element) {
      const instance = OverlayScrollbars(element, memoizedOptions);
      setInstance(instance);
      return () => {
        instance.destroy();
      };
    }
  }, [memoizedOptions, element]);

  return [ref, instance];
}
