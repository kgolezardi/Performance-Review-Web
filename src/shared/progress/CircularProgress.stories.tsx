import { Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { storyWrapperDecorator } from 'src/stories/decorators';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { CircularProgress } from './CircularProgress';

storiesOf('CircularProgress', module)
  .addDecorator(storyWrapperDecorator({ display: 'flex', justifyContent: 'center', alignItems: 'center' }))
  .addDecorator(themeDecorator())
  .add('not complete', () => {
    return (
      <CircularProgress variant="static" value={30} size={180} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 30%</Typography>
      </CircularProgress>
    );
  })
  .add('complete', () => {
    return (
      <CircularProgress variant="static" value={100} size={180} thickness={3}>
        <Typography variant="h6">Title</Typography>
        <Typography variant="subtitle1">Subtitle Subtitle</Typography>
        <Typography variant="subtitle2">Progress 100%</Typography>
      </CircularProgress>
    );
  });
