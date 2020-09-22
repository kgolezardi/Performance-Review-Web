import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { Evaluation } from 'src/global-types';
import { storiesOf } from '@storybook/react';

import { EvaluationOutput } from './EvaluationOutput';

storiesOf('Evaluation Output', module)
  .add('Self', () => {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom>EXCEEDS_EXPECTATIONS</Typography>
            <EvaluationOutput type="self" value={Evaluation.EXCEEDS_EXPECTATIONS} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>MEETS_EXPECTATIONS</Typography>
            <EvaluationOutput type="self" value={Evaluation.MEETS_EXPECTATIONS} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>NEEDS_IMPROVEMENT</Typography>
            <EvaluationOutput type="self" value={Evaluation.NEEDS_IMPROVEMENT} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>SUPERB</Typography>
            <EvaluationOutput type="self" value={Evaluation.SUPERB} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>null</Typography>
            <EvaluationOutput type="self" value={null} />
          </Grid>
        </Grid>
      </Container>
    );
  })
  .add('Peer', () => {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom>EXCEEDS_EXPECTATIONS</Typography>
            <EvaluationOutput type="peer" value={Evaluation.EXCEEDS_EXPECTATIONS} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>MEETS_EXPECTATIONS</Typography>
            <EvaluationOutput type="peer" value={Evaluation.MEETS_EXPECTATIONS} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>NEEDS_IMPROVEMENT</Typography>
            <EvaluationOutput type="peer" value={Evaluation.NEEDS_IMPROVEMENT} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>SUPERB</Typography>
            <EvaluationOutput type="peer" value={Evaluation.SUPERB} />
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>null</Typography>
            <EvaluationOutput type="peer" value={null} />
          </Grid>
        </Grid>
      </Container>
    );
  });
