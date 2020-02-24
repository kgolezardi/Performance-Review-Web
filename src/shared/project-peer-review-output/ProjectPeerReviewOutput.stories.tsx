import { Container, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { relayDecorator } from 'src/stories/decorators';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { ProjectPeerReviewOutput } from './ProjectPeerReviewOutput';
import { ProjectPeerReviewOutputQuery } from './__generated__/ProjectPeerReviewOutputQuery.graphql';

const query = graphql`
  query ProjectPeerReviewOutputQuery {
    viewer {
      projectReviews {
        ...ProjectPeerReviewOutput_projectReview
      }
    }
  }
`;

storiesOf('Project Peer Review Output', module)
  .addDecorator(themeDecorator())
  .addDecorator(relayDecorator())
  .add('Peer Review', () => {
    const data = useLazyLoadQuery<ProjectPeerReviewOutputQuery>(query, {});
    return (
      <Container>
        <Grid container spacing={2}>
          {data.viewer.projectReviews.map((review, index) => (
            <Grid item xs={12} key={index}>
              <ProjectPeerReviewOutput projectReview={review} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  });
