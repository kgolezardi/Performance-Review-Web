import { storiesOf } from '@storybook/react';
import React from 'react';
import { relayDecorator, storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { MembersList } from './MembersList';
import graphql from 'babel-plugin-relay/macro';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { MembersListQuery } from './__generated__/MembersListQuery.graphql';

storiesOf('Member List', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({}))
  .addDecorator(relayDecorator())
  .add('default', () => {
    const data = useLazyLoadQuery<MembersListQuery>(membersListQuery, {});
    return <MembersList personReviews={data.viewer.personReviews} projectReviews={data.viewer.projectReviews} />;
  });

const membersListQuery = graphql`
  query MembersListQuery {
    viewer {
      personReviews {
        ...MembersList_personReviews
      }
      projectReviews {
        ...MembersList_projectReviews
      }
    }
  }
`;
