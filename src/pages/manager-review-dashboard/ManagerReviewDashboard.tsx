import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Container, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

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
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function ManagerReviewDashboard(props: Props) {
  const data = useLazyLoadQuery<ManagerReviewDashboardQuery>(query, {});

  const { filterRows, filters, setFilters } = useFilters();

  return (
    <Container maxWidth="lg">
      <Box marginY={2} height="100%">
        <Paper>
          <TableFilters filters={filters} setFilters={setFilters} />
          <ManagerReviewDashboardTable data={data.viewer.usersToReview} filterRows={filterRows} />
        </Paper>
      </Box>
    </Container>
  );
}
