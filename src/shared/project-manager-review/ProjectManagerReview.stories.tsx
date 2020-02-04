import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { ProjectManagerReviewQuery } from './__generated__/ProjectManagerReviewQuery.graphql';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { ProjectManagerReview } from './ProjectManagerReview';
import { relayDecorator } from 'src/stories/decorators';

const query = graphql`
  query ProjectManagerReviewQuery {
    viewer {
      projectReviews {
        ...ProjectManagerReview_review
      }
    }
  }
`;

storiesOf('Project Manager Review', module)
  .addDecorator(themeDecorator())
  .addDecorator(relayDecorator())
  .add('simple', () => {
    const data = useLazyLoadQuery<ProjectManagerReviewQuery>(query, {});
    return (
      <div>
        {data.viewer.projectReviews.map((review, index) => (
          <ProjectManagerReview review={review} key={index} />
        ))}
      </div>
    );
  });
