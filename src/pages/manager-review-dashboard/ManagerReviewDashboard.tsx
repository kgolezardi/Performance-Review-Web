import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { TextLink } from 'src/shared/text-link';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewDashboardQuery } from './__generated__/ManagerReviewDashboardQuery.graphql';

const query = graphql`
  query ManagerReviewDashboardQuery {
    viewer {
      usersToReview {
        id
        ...getUserLabel_user
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export default function ManagerReviewDashboard(props: Props) {
  const data = useLazyLoadQuery<ManagerReviewDashboardQuery>(query, {});

  return (
    <Container maxWidth="md">
      <Box marginY={2}>
        <TableContainer component={Paper}>
          <Table aria-label="manager review dashboard table">
            <TableHead>
              <TableRow>
                <TableCell>{i18n._('User')}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.viewer.usersToReview.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>{getUserLabel(user)}</TableCell>
                  <TableCell>
                    <TextLink to={`manager-review/${user.id}`} target="_self">
                      {i18n._('View')}
                    </TextLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
