import { useState } from 'react';

import type { Row } from './ManagerAdjustmentDashboardTable';

export type Status = 'todo' | 'doing' | 'done' | 'all';

export interface Filters {
  manager?: string;
  status: Status;
  user?: string;
}

const initialFiltersState: Filters = { status: 'all' };

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(initialFiltersState);

  const filterUser = (row: Row) => {
    if (filters.user) {
      return row.user.includes(filters.user);
    }
    return true;
  };

  const filterManager = (row: Row) => {
    if (filters.manager) {
      return row.manager.includes(filters.manager);
    }
    return true;
  };

  const filterStatus = (row: Row) => {
    switch (filters.status) {
      case 'all':
        return true;
      case 'todo':
        return row.achievements === 0;
      case 'doing': {
        const done = row.achievements === 100;
        const todo = row.achievements === 0;
        return !done && !todo;
      }
      case 'done':
        return row.achievements === 100;
      default:
        return true;
    }
  };

  const filterRows = (rows: Row[]) => {
    return rows.filter(filterUser).filter(filterManager).filter(filterStatus);
  };

  const clearFilters = () => {
    setFilters(initialFiltersState);
  };

  return {
    clearFilters,
    filterRows,
    filters,
    setFilters,
  };
};
