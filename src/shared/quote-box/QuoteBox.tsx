import { Box, BoxProps, Theme, styled } from '@material-ui/core';

export const QuoteBox = styled(Box)(({ theme, bgcolor }: { theme: Theme; bgcolor?: BoxProps['bgcolor'] }) => ({
  backgroundColor: bgcolor || theme.palette.grey[100],
  borderRadius: 4,
  padding: theme.spacing(1, 1.5),
  width: '100%',
}));
