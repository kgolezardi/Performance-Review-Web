import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import { DangerButton } from 'src/shared/danger-button';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';
import { ConfirmButton } from './ConfirmButton';

storiesOf('Confirm Button', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }))
  .add('default', () => (
    <Fragment>
      <ConfirmButton buttonText="دکمه‌ی پیش‌فرض" text="آیا از این عمل مطمئن هستید؟" onConfirm={action('Confirm')} />
      <ConfirmButton
        buttonText="دکمه‌ی کاستوم"
        text="آیا از این عمل مطمئن هستید؟"
        onConfirm={action('Confirm')}
        ButtonComponent={DangerButton}
      />
      <ConfirmButton
        buttonText="دیالوگ با عنوان"
        title="عنوان"
        text="آیا از این عمل مطمئن هستید؟"
        onConfirm={action('Confirm')}
      />
      <ConfirmButton
        buttonText="prop دکمه‌ با"
        title="عنوان"
        text="آیا از این عمل مطمئن هستید؟"
        onConfirm={action('Confirm')}
        ButtonComponent={DangerButton}
        buttonProps={{ variant: 'outlined' }}
        ConfirmComponent={DangerButton}
        cancelProps={{ color: 'default' }}
      />
    </Fragment>
  ));
