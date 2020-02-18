import { Container, Grid } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { promptDecorator, relayDecorator, routerDecorator } from 'src/stories/decorators';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { ProjectPeerReviewForm } from './ProjectPeerReviewForm';
import { ProjectPeerReviewFormQuery } from './__generated__/ProjectPeerReviewFormQuery.graphql';

storiesOf('Project Peer Review Form', module)
  .addDecorator(themeDecorator())
  .addDecorator(relayDecorator())
  .addDecorator(promptDecorator())
  .addDecorator(routerDecorator())
  .add('Peer Review', () => {
    const query = graphql`
      query ProjectPeerReviewFormQuery {
        viewer {
          projectReviews {
            comment {
              ...ProjectPeerReviewForm_projectComment
            }
          }
        }
      }
    `;
    const data = useLazyLoadQuery<ProjectPeerReviewFormQuery>(query, {});
    return (
      <Container>
        {data.viewer.projectReviews.map(
          (review, index) =>
            review.comment && (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12}>
                  <ProjectPeerReviewForm projectComment={review.comment} onSubmit={action('submit')} />
                </Grid>
              </Grid>
            ),
        )}
      </Container>
    );
  });
