import { useTheme } from '@material-ui/core';
import { OptionsObject, useSnackbar, WithSnackbarProps } from 'notistack';
import { ReactNode, useCallback, useMemo } from 'react';

export const useBiDiSnackbar = (): WithSnackbarProps => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { direction } = useTheme();
  const isRTL = direction === 'rtl';
  const directionalEnqueueSnackbar = useCallback(
    (message: ReactNode, options?: OptionsObject | undefined) => {
      const anchorOriginHorizontal = options?.anchorOrigin?.horizontal || 'left';
      const shouldFlip = anchorOriginHorizontal !== 'center';
      const flippedAnchorOriginHorizontal = shouldFlip
        ? anchorOriginHorizontal === 'left'
          ? 'right'
          : 'left'
        : 'center';
      return enqueueSnackbar(message, {
        ...options,
        anchorOrigin: {
          vertical: options?.anchorOrigin?.vertical || 'bottom',
          horizontal: isRTL ? flippedAnchorOriginHorizontal : anchorOriginHorizontal,
        },
      });
    },
    [isRTL, enqueueSnackbar],
  );
  return useMemo(
    () => ({
      enqueueSnackbar: directionalEnqueueSnackbar,
      closeSnackbar,
    }),
    [directionalEnqueueSnackbar, closeSnackbar],
  );
};
