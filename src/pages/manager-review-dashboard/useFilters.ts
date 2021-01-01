import { Evaluation } from 'src/__generated__/enums';
import { useState } from 'react';

import type { Row } from './ManagerReviewDashboardTable';

export type Status = 'todo' | 'doing' | 'done' | 'all';
export type OverallRating = Evaluation | 'all';

export interface Filters {
  manager?: string;
  overallRating: OverallRating;
  status: Status;
  user?: string;
}

const initialFiltersState: Filters = { overallRating: 'all', status: 'all' };

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(initialFiltersState);

  const filterUser = (row: Row) => {
    if (filters.user) {
      return row.user.includes(filters.user);
    }
    return true;
  };

  const filterStatus = (row: Row) => {
    if (filters.status === 'todo') {
      return row.behavioralCompetencies === 0 && row.achievements === 0;
    }
    if (filters.status === 'doing') {
      return !(
        (row.behavioralCompetencies === 100 && row.achievements === 100) ||
        (row.behavioralCompetencies === 0 && row.achievements === 0)
      );
    }
    if (filters.status === 'done') {
      return row.behavioralCompetencies === 100 && row.achievements === 100;
    }
    return true;
  };

  const filteroverallRating = (row: Row) => {
    if (filters.overallRating !== 'all') {
      return row.overallRating === filters.overallRating;
    }
    return true;
  };

  const filterRows = (rows: Row[]) => {
    return rows.filter(filterUser).filter(filterStatus).filter(filteroverallRating);
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
