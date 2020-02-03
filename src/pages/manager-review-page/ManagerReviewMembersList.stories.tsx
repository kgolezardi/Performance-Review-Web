import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { relayDecorator, storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { ManagerReviewMembersListQuery } from './__generated__/ManagerReviewMembersListQuery.graphql';
import { ManagerReviewMembersList } from './ManagerReviewMembersList';

storiesOf('Manager Review Member List', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({}))
  .addDecorator(relayDecorator())
  .add('default', () => {
    const data = useLazyLoadQuery<ManagerReviewMembersListQuery>(membersListQuery, {});
    return (
      <ManagerReviewMembersList
        personReviews={data.viewer.personReviews}
        projectReviews={data.viewer.projectReviews}
        onClick={() => {}}
      />
    );
  });

const membersListQuery = graphql`
  query ManagerReviewMembersListQuery {
    viewer {
      personReviews {
        ...ManagerReviewMembersList_personReviews
      }
      projectReviews {
        ...ManagerReviewMembersList_projectReviews
      }
    }
  }
`;
