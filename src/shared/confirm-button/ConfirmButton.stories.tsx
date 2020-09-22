import React from 'react';
import { DangerButton } from 'src/shared/danger-button';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator } from 'src/stories/decorators';

import { ConfirmButton } from './ConfirmButton';

storiesOf('Confirm Button', module)
  .addDecorator(storyWrapperDecorator())
  .add('default', () => {
    return <ConfirmButton buttonText="Button" text="Are you sure of this action?" onConfirm={action('confirm')} />;
  })
  .add('w/ title', () => {
    return (
      <ConfirmButton
        buttonText="Button"
        title="Title"
        text="Are you sure of this action?"
        onConfirm={action('Confirm')}
      />
    );
  })
  .add('Custom button', () => {
    return (
      <ConfirmButton
        buttonText="Button"
        text="Are you sure of this action?"
        onConfirm={action('Confirm')}
        buttonProps={{ variant: 'contained', color: 'primary' }}
      />
    );
  })
  .add('Custom confirm/cancel buttons', () => {
    return (
      <ConfirmButton
        buttonText="Button"
        title="Title"
        text="Are you sure of this action?"
        onConfirm={action('Confirm')}
        ConfirmComponent={DangerButton}
        confirmProps={{ variant: 'outlined' }}
        confirmButtonText="Yes, I'm sure"
        cancelButtonText="No, go back"
      />
    );
  });
