import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { relayDecorator } from 'src/stories/decorators';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { CriteriaManagerReview } from './CriteriaManagerReview';
import { CriteriaManagerReviewQuery } from './__generated__/CriteriaManagerReviewQuery.graphql';

const query = graphql`
  query CriteriaManagerReviewQuery {
    viewer {
      personReviews {
        ...CriteriaManagerReview_review
      }
    }
  }
`;

storiesOf('Criterion Manager Review', module)
  .addDecorator(themeDecorator())
  .addDecorator(relayDecorator())
  .add('simple', () => {
    const data = useLazyLoadQuery<CriteriaManagerReviewQuery>(query, {});
    return (
      <Container>
        <CriteriaManagerReview review={data.viewer.personReviews[0]} />
      </Container>
    );
  });
