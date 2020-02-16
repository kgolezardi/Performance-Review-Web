import { Container, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { LoremIpsum } from 'lorem-ipsum';
import React from 'react';
import { Evaluation } from 'src/global-types';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { ProjectPeerReviewOutput } from './ProjectPeerReviewOutput';

storiesOf('Project Peer Review Output', module)
  .addDecorator(themeDecorator())
  .add('Peer Review', () => {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProjectPeerReviewOutput
              evaluation={Evaluation.EXCEEDS_EXPECTATIONS}
              evidence={new LoremIpsum().generateSentences(2)}
            />
          </Grid>
        </Grid>
      </Container>
    );
  });
