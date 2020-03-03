import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Portal, Theme, styled } from '@material-ui/core';

const Reacteroids = React.lazy(() =>
  import(
    /* webpackChunkName: "reacteroids" */
    'src/shared/reacteroids/Reacteroids'
  ),
);

interface OwnProps {
  onExit: () => void;
}

type Props = FCProps<OwnProps>;

export function ReacteroidsPortal(props: Props) {
  const { onExit } = props;
  const gameContainer = document.getElementById('game-container');

  return (
    <Portal container={gameContainer}>
      <Container>
        <Reacteroids onExit={onExit} />
      </Container>
    </Portal>
  );
}

const Container = styled('div')(({ theme }: { theme: Theme }) => ({
  zIndex: theme.zIndex.appBar + 10,
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}));
