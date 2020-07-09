import { useEffect, useState } from 'react';

type PrintingCallback = (event?: Event) => void | EventListener;

/**
 * Returns printing state, also calls given callbacks on `beforeprint` and `afterprint` events.
 *
 * @param cb - A function which would be run on `beforeprint` event.
 * If the function returns another function, that would be called on `afterprint` event
 *
 * @example
 * ```
 *const printing = usePrinting(() => {
 *  console.log('beforeprint');
 *  return () => {
 *    console.log('afterprint')
 *  }
 *});
 * ```
 */
export const usePrinting = (cb?: PrintingCallback) => {
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    let onAfterPrint: void | EventListener;

    const handleBeforePrint = (event: Event) => {
      setPrinting(true);
      onAfterPrint = cb?.(event);
    };

    const handleAfterPrint = (event: Event) => {
      setPrinting(false);
      if (typeof onAfterPrint === 'function') {
        onAfterPrint(event);
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [cb]);

  return printing;
};
