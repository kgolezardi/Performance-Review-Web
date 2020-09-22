import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Container, Grid } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { promptDecorator, relayDecorator, routerDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { PeerReviewProjectsForm } from './PeerReviewProjectsForm';
import { PeerReviewProjectsFormStoriesQuery } from './__generated__/PeerReviewProjectsFormStoriesQuery.graphql';

const query = graphql`
  query PeerReviewProjectsFormStoriesQuery {
    viewer {
      projectReviews {
        comment {
          ...PeerReviewProjectsForm_projectComment
        }
      }
    }
  }
`;

storiesOf('Project Peer Review Form', module)
  .addDecorator(relayDecorator())
  .addDecorator(promptDecorator())
  .addDecorator(routerDecorator())
  .add('Peer Review', () => {
    const data = useLazyLoadQuery<PeerReviewProjectsFormStoriesQuery>(query, {});
    return (
      <Container>
        {data.viewer.projectReviews.map(
          (review, index) =>
            review.comment && (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <PeerReviewProjectsForm projectComment={review.comment} onSubmit={action('submit')} />
                </Grid>
              </Grid>
            ),
        )}
      </Container>
    );
  });
