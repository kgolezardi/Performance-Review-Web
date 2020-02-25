import { Box, Theme, styled } from '@material-ui/core';

export const QuoteBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.grey[100],
  borderRadius: 4,
  padding: theme.spacing(2, 1.5),
  width: '100%',
}));
