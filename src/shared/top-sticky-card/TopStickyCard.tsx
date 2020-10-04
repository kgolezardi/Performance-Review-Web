import { Card, Theme, styled } from '@material-ui/core';

export const TopStickyCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar - 25,
  marginTop: theme.spacing(5),
  marginLeft: -theme.spacing(3),
  marginRight: -theme.spacing(3),
}));
