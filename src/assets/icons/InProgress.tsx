import React from 'react';
import InProgressIcon from './in-progress.png';

interface OwnProps {}

export function InProgress(props: OwnProps) {
  return <img {...props} alt="in progress icon" src={InProgressIcon} />;
}
