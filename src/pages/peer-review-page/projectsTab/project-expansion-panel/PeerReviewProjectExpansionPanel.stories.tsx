import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { promptDecorator, relayDecorator, routerDecorator, themeDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { PeerReviewProjectExpansionPanel } from './PeerReviewProjectExpansionPanel';
import { PeerReviewProjectExpansionPanelQuery } from './__generated__/PeerReviewProjectExpansionPanelQuery.graphql';

const query = graphql`
  query PeerReviewProjectExpansionPanelQuery {
    viewer {
      projectReviews {
        ...PeerReviewProjectExpansionPanel_projectReview
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
    const data = useLazyLoadQuery<PeerReviewProjectExpansionPanelQuery>(query, {});
    return (
      <Fragment>
        {data.viewer.projectReviews.map((review, index) => (
          <PeerReviewProjectExpansionPanel projectReview={review} key={index} />
        ))}
      </Fragment>
    );
  });
