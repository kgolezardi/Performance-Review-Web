import { Container, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
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
      <Container>
        <Grid container spacing={2}>
          {data.viewer.projectReviews.map((review, index) => (
            <Grid item xs={12} key={index}>
              <ProjectPeerReviewItem projectReview={review} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  });
