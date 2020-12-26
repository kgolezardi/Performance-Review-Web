import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Container } from '@material-ui/core';
import { relayDecorator } from 'src/stories/decorators';
import { storiesOf } from '@storybook/react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { BehavioralCompetenciesOutput } from './BehavioralCompetenciesOutput';
import { BehavioralCompetenciesOutputQuery } from './__generated__/BehavioralCompetenciesOutputQuery.graphql';

const query = graphql`
  query BehavioralCompetenciesOutputQuery {
    viewer {
      personReviews {
        ...BehavioralCompetenciesOutput_review
      }
    }
  }
`;

storiesOf('Behavioral Competencies Output', module)
  .addDecorator(relayDecorator())
  .add('default', () => {
    // TODO: use mockResolvers
    const data = useLazyLoadQuery<BehavioralCompetenciesOutputQuery>(query, {});
    return (
      <Container>
        <BehavioralCompetenciesOutput review={data.viewer.personReviews[0]} isSelfReview />
      </Container>
    );
  });
