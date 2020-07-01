import { ImperativeHandles } from 'src/shared/overlayscrollbars/useOverlayscrollbars';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scrollbar whenever `location` changes
 *
 * @returns ref - ref to `Overlayscrollbars` component
 */
export const useResetScroll = () => {
  const location = useLocation();
  const ref = useRef<ImperativeHandles>(null);

  useEffect(() => {
    const overlayScrollbar = ref.current?.getOverlayScrollbar();
    overlayScrollbar?.scroll(0);
  }, [location]);

  return ref;
};
