import React from 'react';
import TodoIcon from './to-do.png';

interface OwnProps {}

export function Todo(props: OwnProps) {
  return <img {...props} alt="todo icon" src={TodoIcon} />;
}
