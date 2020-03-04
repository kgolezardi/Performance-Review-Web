import React from 'react';
import { i18n } from '@lingui/core';

import TodoIcon from './to-do.png';

interface OwnProps {}

export function Todo(props: OwnProps) {
  return <img style={{ width: '121px', height: '144' }} {...props} alt={i18n._('Todo')} src={TodoIcon} />;
}
