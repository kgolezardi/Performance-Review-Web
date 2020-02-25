import React from 'react';
import { i18n } from '@lingui/core';

import DoneIcon from './done.png';

interface OwnProps {}

export function Done(props: OwnProps) {
  return <img {...props} alt={i18n._('Done')} src={DoneIcon} />;
}
