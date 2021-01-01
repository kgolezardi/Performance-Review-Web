import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { FCProps } from 'src/shared/types/FCProps';
import { LinearProgress } from 'src/shared/progress';
import { TextLink } from 'src/shared/text-link';
import { getEnumLabel } from 'src/shared/enum-utils';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { peerReviewEvaluationDictionary } from 'src/global-types';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewDashboardQuery } from './__generated__/ManagerReviewDashboardQuery.graphql';
import { TableFilters } from './TableFilters';
import { useFilters } from './useFilters';
import { usePagination } from './usePagination';
import { useSortBy } from './useSortBy';

const query = graphql`
  query ManagerReviewDashboardQuery {
    viewer {
      usersToReview {
        id
        ...getUserLabel_user
        managerPersonReview {
          sahabinessRating
          problemSolvingRating
          executionRating
          thoughtLeadershipRating
          leadershipRating
          presenceRating
          overallRating
        }
        projectReviews {
          managerComment {
            rating
          }
        }
      }
    }
  }
`;

export interface Row {
  id: string;
  user: string;
  behavioralCompetencies: number;
  achievements: number;
  overallRating?: Evaluation | null;
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function ManagerReviewDashboard(props: Props) {
  const data = useLazyLoadQuery<ManagerReviewDashboardQuery>(query, {});

  const rows: Row[] = useMemo(
    () =>
      data.viewer.usersToReview.map((userToReview) => ({
        id: userToReview.id,
        user: getUserLabel(userToReview),
        behavioralCompetencies: userToReview.managerPersonReview
          ? (Object.entries(userToReview.managerPersonReview)
              .filter(([key, value]) => key !== 'overallRating')
              .map(([key, value]) => Boolean(value))
              .filter(Boolean).length /
              Object.entries(userToReview.managerPersonReview).length) *
            100
          : 0,
        achievements:
          (userToReview.projectReviews.map((projectReview) => projectReview.managerComment?.rating).filter(isNotNil)
            .length /
            userToReview.projectReviews.length) *
          100,
        overallRating: userToReview.managerPersonReview?.overallRating,
      })),
    [data.viewer.usersToReview],
  );

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { order, orderBy, onPropertySort, sortRows } = useSortBy<Row>();
  const { filterRows, filters, setFilters } = useFilters();

  const createSortHandler = (property: keyof Row) => (event: React.MouseEvent<unknown>) => {
    onPropertySort(event, property);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Container maxWidth="md">
      <Box marginY={2} height="100%">
        <Paper>
          <TableFilters filters={filters} setFilters={setFilters} />
          <TableContainer component={Paper}>
            <Table aria-label="manager review dashboard table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'user'}
                      direction={orderBy === 'user' ? order : 'asc'}
                      onClick={createSortHandler('user')}
                    >
                      {i18n._('User')}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>{i18n._('Behavioral Competencies')}</TableCell>
                  <TableCell>{i18n._('Achievements')}</TableCell>
                  <TableCell>{i18n._('Overall Rating')}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {sortRows(filterRows(rows))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row.id}>
                      <TableCell>{row.user}</TableCell>
                      <TableCell>
                        <LinearProgress
                          value={row.behavioralCompetencies}
                          color={getColor(row.behavioralCompetencies)}
                        />
                      </TableCell>
                      <TableCell>
                        <LinearProgress value={row.achievements} color={getColor(row.achievements)} />
                      </TableCell>
                      <TableCell>
                        {row.overallRating
                          ? getEnumLabel(peerReviewEvaluationDictionary, row.overallRating, i18n._('Unknown'))
                          : '---'}
                      </TableCell>
                      <TableCell>
                        <TextLink to={`manager-review/${row.id}`} target="_self">
                          {i18n._('View')}
                        </TextLink>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelDisplayedRows={(paginationInfo) =>
                i18n._('{from} to {to} of {count}', {
                  from: paginationInfo.from,
                  to: paginationInfo.to,
                  count: paginationInfo.count,
                })
              }
              labelRowsPerPage={i18n._('Rows per page:')}
            />
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
}

const getColor = (value: number) => {
  if (value === 100) {
    return 'complete';
  }
  if (value <= 20) {
    return 'low';
  }
  if (value < 60) {
    return 'medium';
  }
  return 'high';
};
