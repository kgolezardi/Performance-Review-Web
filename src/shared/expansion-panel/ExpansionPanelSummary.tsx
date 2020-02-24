import { ExpansionPanelSummary as MuiExpansionPanelSummary, ExpansionPanelSummaryProps } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends ExpansionPanelSummaryProps {}

type Props = FCProps<OwnProps>;

export function ExpansionPanelSummary(props: Props) {
  return <MuiExpansionPanelSummary expandIcon={<ExpandMoreIcon />} {...props} />;
}
