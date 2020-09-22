import React from 'react';
import { Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator } from 'src/stories/decorators';

import { CircularProgress } from './CircularProgress';

storiesOf('CircularProgress', module)
  .addDecorator(storyWrapperDecorator({ display: 'flex', justifyContent: 'center', alignItems: 'center' }))
  .add('default color', () => {
    return (
      <CircularProgress value={30} size={180} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 30%</Typography>
      </CircularProgress>
    );
  })
  .add('low color', () => {
    return (
      <CircularProgress value={11} color="low" size={180} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 11%</Typography>
      </CircularProgress>
    );
  })
  .add('medium color', () => {
    return (
      <CircularProgress value={32} color="medium" size={180} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 32%</Typography>
      </CircularProgress>
    );
  })
  .add('high color', () => {
    return (
      <CircularProgress value={80} color="high" size={180} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 80%</Typography>
      </CircularProgress>
    );
  })
  .add('complete color', () => {
    return (
      <CircularProgress value={100} color="complete" size={180} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 100%</Typography>
      </CircularProgress>
    );
  })
  .add('small', () => {
    return (
      <CircularProgress value={11} color="low" size={60} thickness={3}>
        <Typography variant="h6">Title</Typography>
      </CircularProgress>
    );
  })
  .add('large', () => {
    return (
      <CircularProgress value={32} color="medium" size={360} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 32%</Typography>
      </CircularProgress>
    );
  });
