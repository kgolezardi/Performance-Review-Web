import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import ArrayAppendButton from '../inputs/array-input/ArrayAppendButton';
import ArrayInput from '../inputs/array-input/ArrayInput';
import ArrayOutput from '../inputs/array-input/ArrayOutput';
import ArrayRemoveButton from '../inputs/array-input/ArrayRemoveButton';
import SubmitButton from '../utils/SubmitButton';
import { Forminator, StringInput } from '..';

storiesOf('Forminator/Array input', module)
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="text" fullWidth />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('prepend', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput>
            <Grid item>
              <ArrayAppendButton prepend>add</ArrayAppendButton>
            </Grid>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="text" fullWidth />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  });
storiesOf('Forminator/Array input/with initial value', module)
  .add('on append button', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton initialValue="+98">add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on inner input', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth initialValue="+98" />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on array with', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput initialValue={['+98912', '+98911', '+98935']}>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on array with undefined value', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput initialValue={[undefined, undefined, undefined]}>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on array with undefined value and initial value on inner input', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput initialValue={[undefined, undefined, undefined]}>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth initialValue="+98" />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on array input contained undefined', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput initialValue={['+98912', undefined, '+98935']}>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth initialValue="+98" />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on parent node', () => {
    return (
      <Forminator onSubmit={action('submit')} initialValue={['+98935', undefined, '+98936']}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth initialValue="+98" />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on parent node and array input', () => {
    return (
      <Forminator onSubmit={action('submit')} initialValue={['+98935', undefined, '+98936']}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput initialValue={['+98912', '+98911', '+98935']}>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth initialValue="+98" />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton>add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  })
  .add('on add btn and inner input', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Grid container spacing={2} style={{ width: 400, margin: 16 }}>
          <ArrayInput initialValue={[undefined, undefined]}>
            <ArrayOutput>
              <Grid item xs={12}>
                <Paper style={{ padding: 16 }}>
                  <StringInput label="phone" fullWidth initialValue="+98935" />
                  <ArrayRemoveButton>remove</ArrayRemoveButton>
                </Paper>
              </Grid>
            </ArrayOutput>
            <Grid item>
              <ArrayAppendButton initialValue="+98">add</ArrayAppendButton>
            </Grid>
          </ArrayInput>
          <Grid item>
            <SubmitButton color="primary" variant="contained">
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </Forminator>
    );
  });
