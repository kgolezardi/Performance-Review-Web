import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Evaluation } from 'src/__generated__/enums';
import { FCProps } from 'src/shared/types/FCProps';
import { LinearProgress } from 'src/shared/progress';
import { Styles } from 'src/shared/types/Styles';
import { getProgressBarColor } from 'src/shared/utils/getProgressBarColor';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';
import { useSortBy } from 'src/shared/hooks';

import { ManagerAdjustmentDashboardTable_data$key } from './__generated__/ManagerAdjustmentDashboardTable_data.graphql';

const fragment = graphql`
  fragment ManagerAdjustmentDashboardTable_data on UserNode @relay(plural: true) {
    id
    avatarUrl
    ...getUserLabel_user
    manager {
      ...getUserLabel_user
    }
    projectReviews {
      approvedByManager
    }
  }
`;

export interface Row {
  id: string;
  user: string;
  avatarUrl: string | null;
  manager: string;
  achievements: number;
  overallRating?: Evaluation | null;
}

interface OwnProps {
  data: ManagerAdjustmentDashboardTable_data$key;
  filterRows: (rows: Row[]) => Row[];
  onClickRow: (id: string) => (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerAdjustmentDashboardTable(props: Props) {
  const { filterRows, onClickRow } = props;
  const classes = useStyles(props);

  const data = useFragment(fragment, props.data);
  const { order, orderBy, onPropertySort, sortRows } = useSortBy<Row>();

  const rows: Row[] = useMemo(
    () =>
      data.map((userToReview) => ({
        id: userToReview.id,
        avatarUrl: userToReview.avatarUrl,
        user: getUserLabel(userToReview),
        manager: userToReview.manager ? getUserLabel(userToReview.manager) : '---',
        achievements:
          (userToReview.projectReviews.length > 0
            ? userToReview.projectReviews.filter((projectReview) => projectReview.approvedByManager).length /
              userToReview.projectReviews.length
            : 1) * 100,
      })),
    [data],
  );

  const createSortHandler = (property: keyof Row) => (event: React.MouseEvent<unknown>) => {
    onPropertySort(event, property);
  };

  const filteredRows = sortRows(filterRows(rows));

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table size="small" stickyHeader>
          <colgroup>
            <col style={{ width: '33%' }} />
            <col style={{ width: '33%' }} />
            <col style={{ width: '33%' }} />
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
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'manager'}
                  direction={orderBy === 'manager' ? order : 'asc'}
                  onClick={createSortHandler('manager')}
                >
                  {i18n._('Manager')}
                </TableSortLabel>
              </TableCell>
              <TableCell>{i18n._('Achievements')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow hover key={row.id} onClick={onClickRow(row.id)} className={classes.row}>
                <TableCell>
                  <Avatar src={row.avatarUrl ?? undefined} className={classes.avatar} />
                  {row.user}
                </TableCell>
                <TableCell>{row.manager}</TableCell>
                <TableCell>
                  <LinearProgress value={row.achievements} color={getProgressBarColor(row.achievements)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    avatar: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    tableContainer: {
      flex: 1,
    },
    row: {
      cursor: 'pointer',
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerAdjustmentDashboardTable' });
type StyleProps = Styles<typeof styles>;
