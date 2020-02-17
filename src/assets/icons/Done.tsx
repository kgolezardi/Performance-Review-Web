import React from 'react';
import DoneIcon from './done.png';

interface OwnProps {}

export function Done(props: OwnProps) {
  return <img {...props} alt="done icon" src={DoneIcon} />;
}
