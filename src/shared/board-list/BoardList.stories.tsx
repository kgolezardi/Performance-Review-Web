import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid } from '@material-ui/core';
import { ID, UserNodeResolver, ViewerNodeResolver } from 'src/stories/mock-resolvers';
import { UserCard } from 'src/shared/user-card';
import { mockRelayDecorator, routerDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { BoardList } from './BoardList';
import { BoardListStoriesQuery } from './__generated__/BoardListStoriesQuery.graphql';
import { PlaceHolder } from './PlaceHolder';

const PlaceHolerExample = () => {
  return (
    <PlaceHolder>
      <div>No Child! No Money!</div>
    </PlaceHolder>
  );
};
const CustomBoardListWithChild = ({ title, count = 0 }: { title: string; count?: Number }) => {
  return (
    <BoardList listTitle={title}>
      {count ? (
        Array.from(Array(count)).map((item, index) => <div key={index}>Oh my card! {index + 1}</div>)
      ) : (
        <PlaceHolerExample />
      )}
    </BoardList>
  );
};
storiesOf('Board List', module)
  .addDecorator(routerDecorator())
  .addDecorator(mockRelayDecorator({ ...ViewerNodeResolver(), ...UserNodeResolver() }))
  .add('default', () => {
    return (
      <Box padding={2}>
        <Grid container spacing={2}>
          <CustomBoardListWithChild title="انجام نشده" count={50} />
          <CustomBoardListWithChild title="در حال انجام" count={3} />
          <CustomBoardListWithChild title="انجام شده" />
        </Grid>
      </Box>
    );
  })
  .add('with user card', () => {
    const data = useLazyLoadQuery<BoardListStoriesQuery>(
      graphql`
        query BoardListStoriesQuery($id: ID!) {
          viewer {
            user(id: $id) {
              ...UserCard_user
            }
          }
        }
      `,
      { id: ID('UserNode:1') },
    );
    const user = data.viewer.user;
    if (!user) {
      return <div />;
    }
    return (
      <Box padding={2}>
        <Grid container spacing={2}>
          <BoardList listTitle="انجام شده">
            {Array.from(Array(20)).map((o, index) => (
              <UserCard user={user} key={index} />
            ))}
          </BoardList>
        </Grid>
      </Box>
    );
  });
