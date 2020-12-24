import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Container } from '@material-ui/core';
import { relayDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { CriteriaOutput } from './CriteriaOutput';
import { CriteriaOutputStoriesQuery } from './__generated__/CriteriaOutputStoriesQuery.graphql';

const query = graphql`
  query CriteriaOutputStoriesQuery {
    viewer {
      personReviews {
        ...CriteriaOutput_review
      }
    }
  }
`;

storiesOf('Criterion Manager Review', module)
  .addDecorator(relayDecorator())
  .add('simple', () => {
    // TODO: use mockResolvers
    const data = useLazyLoadQuery<CriteriaOutputStoriesQuery>(query, {});
    return (
      <Container>
        <CriteriaOutput review={data.viewer.personReviews[0]} isSelfReview />
      </Container>
    );
  });
