import React from 'react';
import { Components, MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import { FCProps } from 'src/shared/types/FCProps';
import { Typography } from '@material-ui/core';
import { withProps } from 'src/shared/utils/withProps';

const H1Typography = withProps(Typography, { variant: 'h1', gutterBottom: true, style: { marginTop: '2em' } });
const H2Typography = withProps(Typography, { variant: 'h2', gutterBottom: true, style: { marginTop: '2em' } });
const H3Typography = withProps(Typography, { variant: 'h3', gutterBottom: true, style: { marginTop: '2em' } });
const H4Typography = withProps(Typography, { variant: 'h4', gutterBottom: true, style: { marginTop: '2em' } });
const H5Typography = withProps(Typography, { variant: 'h5', gutterBottom: true, style: { marginTop: '2em' } });
const H6Typography = withProps(Typography, { variant: 'h6', gutterBottom: true, style: { marginTop: '2em' } });
const PTypography = withProps(Typography, {
  variant: 'body1',
  gutterBottom: true,
  style: { textAlign: 'justify', lineHeight: '1.5em' },
});

const components: Components = {
  h1: H1Typography,
  h2: H2Typography,
  h3: H3Typography,
  h4: H4Typography,
  h5: H5Typography,
  h6: H6Typography,
  p: PTypography,
};

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function MDXProvider(props: Props) {
  const { children } = props;
  return <BaseMDXProvider components={components}>{children}</BaseMDXProvider>;
}
