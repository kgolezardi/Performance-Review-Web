import * as React from 'react';

declare module 'react-router-dom' {
  export class Routes extends React.Component {}
  export interface Transition {
    retry(): void;
  }
  export interface Blocker {
    (tx: Transition): void;
  }
  export function useBlocker(blocker: Blocker, when: boolean): void;
}
