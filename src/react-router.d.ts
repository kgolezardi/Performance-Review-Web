import { History } from 'history';
import React from 'react';

declare module 'react-router' {
  export const __HistoryContext: React.Context<History>;
}
