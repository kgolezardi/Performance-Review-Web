import OverlayScrollbars from 'overlayscrollbars';
import React, { useImperativeHandle, useLayoutEffect, useRef } from 'react';
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
  ref: React.RefObject<HTMLElement | null>,
  options: OverlayScrollbars.Options = defaultOptions,
  instanceRef?: React.Ref<ImperativeHandles>,
) {
  const memoizedOptions = useDeepMemoize(options);
  const instance = useRef<OverlayScrollbars | null>(null);
  // it's important to use "useLayoutEffect" otherwise you will see a flash of un-styled content.
  useLayoutEffect(() => {
    if (ref.current) {
      instance.current = OverlayScrollbars(ref.current, memoizedOptions);
      return () => {
        if (instance && instance.current) instance.current.destroy();
      };
    }
  }, [memoizedOptions, ref]);

  useImperativeHandle(instanceRef, () => ({ getOverlayScrollbar: () => instance.current }), []);
}
