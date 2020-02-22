import { Container } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { relayDecorator } from 'src/stories/decorators';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { CriteriaOutput } from './CriteriaOutput';
import { CriteriaOutputQuery } from './__generated__/CriteriaOutputQuery.graphql';

const query = graphql`
  query CriteriaOutputQuery {
    viewer {
      personReviews {
        ...CriteriaOutput_review
      }
    }
  }
`;

storiesOf('Criterion Manager Review', module)
  .addDecorator(themeDecorator())
  .addDecorator(relayDecorator())
  .add('simple', () => {
    // TODO: use mockResolvers
    const data = useLazyLoadQuery<CriteriaOutputQuery>(query, {});
    return (
      <Container>
        <CriteriaOutput review={data.viewer.personReviews[0]} />
      </Container>
    );
  });
