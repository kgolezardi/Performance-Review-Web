import React from 'react';
import { Box, styled } from '@material-ui/core';

import { Reacteroids } from './reacteroids';

export function ReacteroidsWrapper() {
  return (
    <Wrapper>
      <Box width={800} height={600}>
        <Reacteroids />
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});
