import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { promptDecorator, relayDecorator, routerDecorator, themeDecorator } from 'src/stories/decorators';
import { ProjectPeerReviewItem } from './ProjectPeerReviewItem';
import { ProjectPeerReviewItemQuery } from './__generated__/ProjectPeerReviewItemQuery.graphql';

const query = graphql`
  query ProjectPeerReviewItemQuery {
    viewer {
      projectReviews {
        ...ProjectPeerReviewItem_projectReview
      }
    }
  }
`;

storiesOf('Project Peer Review Item', module)
  .addDecorator(themeDecorator())
  .addDecorator(relayDecorator())
  .addDecorator(promptDecorator())
  .addDecorator(routerDecorator())
  .add('Peer Review', () => {
    const data = useLazyLoadQuery<ProjectPeerReviewItemQuery>(query, {});
    return (
      <Fragment>
        {data.viewer.projectReviews.map((review, index) => (
          <ProjectPeerReviewItem projectReview={review} key={index} />
        ))}
      </Fragment>
    );
  });
