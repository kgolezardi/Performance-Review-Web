import { i18n } from '@lingui/core';
import React from 'react';
import InProgressIcon from './in-progress.png';

interface OwnProps {}

export function InProgress(props: OwnProps) {
  return <img {...props} alt={i18n._('In Progress')} src={InProgressIcon} />;
}
