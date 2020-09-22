import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ID, UserNodeResolver, ViewerNodeResolver } from 'src/stories/mock-resolvers';
import { mockRelayDecorator, routerDecorator, storyWrapperDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { UserCard } from './UserCard';
import { UserCardStoriesQuery } from './__generated__/UserCardStoriesQuery.graphql';

// TODO: add tests when relay mock is available
storiesOf('User Card', module)
  .addDecorator(routerDecorator())
  .addDecorator(storyWrapperDecorator())
  .addDecorator(mockRelayDecorator({ ...ViewerNodeResolver(), ...UserNodeResolver() }))
  .add('default', () => {
    const data = useLazyLoadQuery<UserCardStoriesQuery>(
      graphql`
        query UserCardStoriesQuery($id: ID!) {
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
    if (user) {
      return <UserCard user={user} />;
    }
    return <div />;
  });
