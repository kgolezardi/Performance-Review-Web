import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { mockRelayDecorator, routerDecorator, storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { ID, UserNodeResolver, ViewerNodeResolver } from 'src/stories/mock-resolvers';
import { UserCardStoriesQuery } from './__generated__/UserCardStoriesQuery.graphql';
import { UserCard } from './UserCard';

// TODO: add tests when relay mock is available
storiesOf('User Card', module)
  .addDecorator(themeDecorator())
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
