import { Theme, styled } from '@material-ui/core';

export const ActionBar = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'grid',
  gridAutoFlow: 'column',
  gridGap: theme.spacing(),
  justifyContent: 'end',
  width: '100%',
}));
