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
import { getEnumLabel } from 'src/shared/enum-utils';
import { getProgressBarColor } from 'src/shared/utils/getProgressBarColor';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { peerReviewEvaluationDictionary } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';
import { useSortBy } from 'src/shared/hooks/useSortBy';

import { ManagerReviewDashboardTable_data$key } from './__generated__/ManagerReviewDashboardTable_data.graphql';

const fragment = graphql`
  fragment ManagerReviewDashboardTable_data on UserNode @relay(plural: true) {
    id
    avatarUrl
    ...getUserLabel_user
    manager {
      ...getUserLabel_user
    }
    managerPersonReview {
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
  avatarUrl: string | null;
  manager: string;
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
            ? userToReview.projectReviews.map((projectReview) => projectReview.managerComment?.rating).filter(isNotNil)
                .length / userToReview.projectReviews.length
            : 1) * 100,
        overallRating: userToReview.managerPersonReview?.overallRating,
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
              <TableCell>{i18n._('Overall Rating')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                hover
                className={classes.bodyRow}
                key={row.id}
                onClick={createRowClickHandler(row.id)}
                selected={activeId === row.id}
              >
                <TableCell>
                  <Avatar src={row.avatarUrl ?? undefined} className={classes.avatar} />
                  {row.user}
                </TableCell>
                <TableCell>{row.manager}</TableCell>
                <TableCell>
                  <LinearProgress value={row.achievements} color={getProgressBarColor(row.achievements)} />
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
    bodyRow: {
      cursor: 'pointer',
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewDashboardTable' });
type StyleProps = Styles<typeof styles>;
