import React from 'react';
import { i18n } from '@lingui/core';

import DoneIcon from './done.png';

interface OwnProps {}

export function Done(props: OwnProps) {
  return <img style={{ width: '96px', height: '120px' }} {...props} alt={i18n._('Done')} src={DoneIcon} />;
}
