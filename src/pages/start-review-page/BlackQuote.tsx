import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Theme, lighten, styled } from '@material-ui/core';

const StyledBlackQuote = styled('blockquote' as 'blockquote')(({ theme }: { theme: Theme }) => ({
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

interface OwnProps {}

type Props = FCProps<OwnProps>;

export const BlackQuote = (props: Props) => <StyledBlackQuote {...props} />;
