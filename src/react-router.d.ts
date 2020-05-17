import React from 'react';
import { History } from 'history';

declare module 'react-router' {
  export const __HistoryContext: React.Context<History>;
}
