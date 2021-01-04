import clsx from 'clsx';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { Box, Drawer, Paper, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewDashboardDrawerContent } from './ManagerReviewDashboardDrawerContent';
import { ManagerReviewDashboardQuery } from './__generated__/ManagerReviewDashboardQuery.graphql';
import { ManagerReviewDashboardTable } from './ManagerReviewDashboardTable';
import { TableFilters } from './TableFilters';
import { useFilters } from './useFilters';

const query = graphql`
  query ManagerReviewDashboardQuery {
    viewer {
      usersToReview {
        id
        ...ManagerReviewDashboardTable_data
        ...ManagerReviewDashboardDrawerContent_data
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function ManagerReviewDashboard(props: Props) {
  const classes = useStyles(props);

  const data = useLazyLoadQuery<ManagerReviewDashboardQuery>(query, {});

  const [activeId, setActiveId] = useState<string | null>(null);
  const { filterRows, filters, setFilters } = useFilters();

  const open = !!activeId;

  const createRowClickHandler = (id: string) => (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    setActiveId(id);
  };

  const handleDrawerCloseClick = () => {
    setActiveId(null);
  };

  return (
    <Box component={Paper} className={classes.root}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Box marginBottom={1.5}>
          <TableFilters filters={filters} setFilters={setFilters} />
        </Box>
        <ManagerReviewDashboardTable
          activeId={activeId}
          classes={{ root: classes.table }}
          createRowClickHandler={createRowClickHandler}
          data={data.viewer.usersToReview}
          filterRows={filterRows}
        />
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
          paperAnchorRight: classes.drawerPaperAnchorRight,
        }}
      >
        {activeId && (
          <ManagerReviewDashboardDrawerContent
            activeId={activeId}
            data={data.viewer.usersToReview}
            onCloseClick={handleDrawerCloseClick}
          />
        )}
      </Drawer>
    </Box>
  );
}

const drawerWidth = 360;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: 'calc(100% - 48px)',
      margin: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      position: 'relative',
    },
    drawerPaper: {
      top: 'auto',
      position: 'absolute',
      height: '100%',
      width: drawerWidth,
    },
    drawerPaperAnchorRight: {
      left: 'auto',
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
      zIndex: theme.zIndex.drawer + 10,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    table: {
      flex: 1,
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewDashboard' });
