import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import ArrayAppendButton from '../inputs/array-input/ArrayAppendButton';
import ArrayInput from '../inputs/array-input/ArrayInput';
import ArrayOutput from '../inputs/array-input/ArrayOutput';
import ArrayRemoveButton from '../inputs/array-input/ArrayRemoveButton';
import DictInput from '../inputs/dict-input/DictInput';
import DictInputItem from '../inputs/dict-input/DictInputItem';
import SubmitButton from '../utils/SubmitButton';
import { Forminator, StringInput } from '../index';

function LocationInput() {
  return (
    <DictInput>
      <DictInputItem field="lat">
        <StringInput label="latitude" />
      </DictInputItem>
      <DictInputItem field="lng">
        <StringInput label="longitude" />
      </DictInputItem>
    </DictInput>
  );
}

function PolygonInput() {
  return (
    <Grid container spacing={2}>
      <ArrayInput>
        <ArrayOutput>
          <Grid item xs={12}>
            <Paper style={{ padding: 16 }}>
              <LocationInput />
              <ArrayRemoveButton>remove</ArrayRemoveButton>
            </Paper>
          </Grid>
        </ArrayOutput>
        <Grid item>
          <ArrayAppendButton>add</ArrayAppendButton>
        </Grid>
      </ArrayInput>
    </Grid>
  );
}

storiesOf('Forminator/complex', module)
  .add('array of dict', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <PolygonInput />
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('dict with array of dict', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <DictInput>
            <DictInputItem field="name">
              <Grid item xs>
                <StringInput />
              </Grid>
            </DictInputItem>
            <DictInputItem field="area">
              <PolygonInput />
            </DictInputItem>
          </DictInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  });
