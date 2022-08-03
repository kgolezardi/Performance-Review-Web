import { jssPreset, StylesProvider } from '@material-ui/core';
import { create } from 'jss';
import rtl from 'jss-rtl';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function RtlSupportProvider(props: Props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
