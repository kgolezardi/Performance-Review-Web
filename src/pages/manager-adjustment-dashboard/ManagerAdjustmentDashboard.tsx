import React from 'react';
import clsx from 'clsx';
import graphql from 'babel-plugin-relay/macro';
import { Box, Paper, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { useHistory } from 'react-router-dom';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerAdjustmentDashboardQuery } from './__generated__/ManagerAdjustmentDashboardQuery.graphql';
import { ManagerAdjustmentDashboardTable } from './ManagerAdjustmentDashboardTable';
import { TableFilters } from './TableFilters';
import { useFilters } from './useFilters';

const query = graphql`
  query ManagerAdjustmentDashboardQuery {
    viewer {
      usersToReview {
        id
        ...ManagerAdjustmentDashboardTable_data
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function ManagerAdjustmentDashboard(props: Props) {
  const classes = useStyles(props);

  const data = useLazyLoadQuery<ManagerAdjustmentDashboardQuery>(query, {});
  const history = useHistory();

  const { filterRows, filters, setFilters } = useFilters();

  const handleClickRow = (id: string) => () => {
    history.push(`/manager-adjustment/${id}`);
  };

  return (
    <Box component={Paper} className={classes.root}>
      <main className={clsx(classes.content)}>
        <Box marginBottom={1.5}>
          <TableFilters filters={filters} setFilters={setFilters} />
        </Box>
        <ManagerAdjustmentDashboardTable
          classes={{ root: classes.table }}
          data={data.viewer.usersToReview}
          filterRows={filterRows}
          onClickRow={handleClickRow}
        />
      </main>
    </Box>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: 'calc(100% - 48px)',
      margin: theme.spacing(3),
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(3),
      zIndex: theme.zIndex.drawer + 10,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    table: {
      flex: 1,
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerAdjustmentDashboard' });
