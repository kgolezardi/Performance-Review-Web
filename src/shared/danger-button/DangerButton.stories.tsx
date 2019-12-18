import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { DangerButton } from './DangerButton';

storiesOf('Danger Button', module)
  .addDecorator(themeDecorator())
  .addDecorator(
    storyWrapperDecorator({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }),
  )
  .add('default', () => (
    <Fragment>
      <DangerButton onClick={action('Click')}>Text</DangerButton>
      <DangerButton variant="outlined" onClick={action('Click')}>
        Outlined
      </DangerButton>
      <DangerButton variant="contained" onClick={action('Click')}>
        Contained
      </DangerButton>
    </Fragment>
  ));
