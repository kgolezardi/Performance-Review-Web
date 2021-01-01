import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { Evaluation } from 'src/__generated__/enums';
import { FCProps } from 'src/shared/types/FCProps';
import { LinearProgress } from 'src/shared/progress';
import { Styles } from 'src/shared/types/Styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { getEnumLabel } from 'src/shared/enum-utils';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { peerReviewEvaluationDictionary } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';

import { ManagerReviewDashboardTable_data$key } from './__generated__/ManagerReviewDashboardTable_data.graphql';
import { usePagination } from './usePagination';
import { useSortBy } from './useSortBy';

const fragment = graphql`
  fragment ManagerReviewDashboardTable_data on UserNode @relay(plural: true) {
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
`;

export interface Row {
  id: string;
  user: string;
  behavioralCompetencies: number;
  achievements: number;
  overallRating?: Evaluation | null;
}

interface OwnProps {
  activeId: string | null;
  createRowClickHandler: (id: string) => (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  data: ManagerReviewDashboardTable_data$key;
  filterRows: (rows: Row[]) => Row[];
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewDashboardTable(props: Props) {
  const { activeId, createRowClickHandler, filterRows } = props;
  const classes = useStyles(props);

  const data = useFragment(fragment, props.data);
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { order, orderBy, onPropertySort, sortRows } = useSortBy<Row>();

  const rows: Row[] = useMemo(
    () =>
      data.map((userToReview) => ({
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
    [data],
  );

  const createSortHandler = (property: keyof Row) => (event: React.MouseEvent<unknown>) => {
    onPropertySort(event, property);
  };

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader>
          <colgroup>
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
          </colgroup>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {sortRows(filterRows(rows))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.id} onClick={createRowClickHandler(row.id)} selected={activeId === row.id}>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>
                    <LinearProgress value={row.behavioralCompetencies} color={getColor(row.behavioralCompetencies)} />
                  </TableCell>
                  <TableCell>
                    <LinearProgress value={row.achievements} color={getColor(row.achievements)} />
                  </TableCell>
                  <TableCell>
                    {row.overallRating
                      ? getEnumLabel(peerReviewEvaluationDictionary, row.overallRating, i18n._('Unknown'))
                      : '---'}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        labelRowsPerPage={i18n._('Rows per page')}
      />
    </div>
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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    tableContainer: {
      flex: 1,
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewDashboardTable' });
type StyleProps = Styles<typeof styles>;
