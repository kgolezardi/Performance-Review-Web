import React from 'react';
import { i18n } from '@lingui/core';

import InProgressIcon from './in-progress.png';

interface OwnProps {}

export function InProgress(props: OwnProps) {
  return (
    <img style={{ width: '100px', height: '128px' }} {...props} alt={i18n._('In Progress')} src={InProgressIcon} />
  );
}
