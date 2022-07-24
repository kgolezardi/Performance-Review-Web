import React from 'react';
import { Box, Typography, lighten, styled } from '@material-ui/core';
import type { ReactMarkdownPropsBase } from 'react-markdown';

const StyledBlackQuote = styled('blockquote')(({ theme }) => ({
  backgroundColor: lighten(theme.palette.primary.main, 0.85),
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(4),
  marginRight: 0,
  marginLeft: 0,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  '& p': {
    lineHeight: '2.5em !important',
  },
}));

export const defaultRenderers: ReactMarkdownPropsBase['renderers'] = {
  paragraph: Typography,
  blockquote: StyledBlackQuote,
  heading: ({ children, level }: { children: React.ReactNode; level: 1 | 2 | 3 | 4 | 5 | 6 }) => (
    <Typography variant={('h' + level) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}>{children}</Typography>
  ),
};

export const helpTextRenderers: ReactMarkdownPropsBase['renderers'] = {
  ...defaultRenderers,
  paragraph: ({ children }) => (
    <Box component="span" display="block">
      {children}
    </Box>
  ),
  text: ({ children }) => <>{String(children).replace('\r', '')}</>,
};
