import React from 'react';
import rtl from 'jss-rtl';
import { FCProps } from 'src/shared/types/FCProps';
import { StylesProvider, jssPreset } from '@material-ui/core';
import { create } from 'jss';

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
});

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function RtlSupportProvider(props: Props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
