import { storiesOf } from '@storybook/react';
import React from 'react';
import { NumberOutput } from 'src/shared/number-output/NumberOutput';
import { storyWrapperDecorator } from 'src/stories/decorators/StoryWrapperDecorator';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { Typography } from '@material-ui/core';

storiesOf('Number Output', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator())
  .add('Simple', () => {
    return <NumberOutput>1234567890</NumberOutput>;
  })
  .add('Typography', () => {
    return (
      <Typography variant="h4">
        <NumberOutput>1234567890</NumberOutput>
      </Typography>
    );
  });
