import { Paper, styled, Theme } from '@material-ui/core';

export const StickyActionBar = styled(Paper)(({ theme }: { theme: Theme }) => ({
  position: 'sticky',
  bottom: -4,
  zIndex: 1000,
  width: '100%',
  display: 'grid',
  gridAutoFlow: 'column',
  gridGap: theme.spacing(),
  padding: theme.spacing(2),
  justifyContent: 'end',
}));
