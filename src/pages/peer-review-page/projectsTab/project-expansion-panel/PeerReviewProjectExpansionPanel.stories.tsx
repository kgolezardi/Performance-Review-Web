import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { promptDecorator, relayDecorator, routerDecorator } from 'src/stories/decorators';
import { PeerReviewProjectExpansionPanel } from './PeerReviewProjectExpansionPanel';
import { PeerReviewProjectExpansionPanelStoriesQuery } from './__generated__/PeerReviewProjectExpansionPanelStoriesQuery.graphql';

const query = graphql`
  query PeerReviewProjectExpansionPanelStoriesQuery {
    viewer {
      projectReviews {
        ...PeerReviewProjectExpansionPanel_projectReview
      }
    }
  }
`;

storiesOf('Project Peer Review Item', module)
  .addDecorator(relayDecorator())
  .addDecorator(promptDecorator())
  .addDecorator(routerDecorator())
  .add('Peer Review', () => {
    const data = useLazyLoadQuery<PeerReviewProjectExpansionPanelStoriesQuery>(query, {});
    return (
      <Fragment>
        {data.viewer.projectReviews.map((review, index) => (
          <PeerReviewProjectExpansionPanel projectReview={review} key={index} />
        ))}
      </Fragment>
    );
  });
