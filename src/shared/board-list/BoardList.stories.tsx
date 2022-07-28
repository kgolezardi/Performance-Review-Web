import { Box, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { UserCard } from 'src/shared/user-card';
import { mockRelayDecorator, routerDecorator } from 'src/stories/decorators';
import { ID, UserNodeResolver, ViewerNodeResolver } from 'src/stories/mock-resolvers';
import { BoardList } from './BoardList';
import { PlaceHolder } from './PlaceHolder';
import { BoardListStoriesQuery } from './__generated__/BoardListStoriesQuery.graphql';

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
