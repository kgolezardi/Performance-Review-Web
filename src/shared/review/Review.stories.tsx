import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Forminator } from 'src/shared/forminator';
import DictInput from 'src/shared/forminator/inputs/dict-input/DictInput';
import SubmitButton from 'src/shared/forminator/utils/SubmitButton';
import Review from 'src/shared/review/Review';
import { storyWrapperDecorator } from 'src/stories/decorators/StoryWrapperDecorator';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';

storiesOf('Review', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({ width: 800, height: 'auto' }))
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <Review title="سحابی بودن" prefix="sahabi-boodan"></Review>
          <Review title="فلان بودن" prefix="folan-boodan"></Review>
        </DictInput>
        <SubmitButton variant="contained">ثبت</SubmitButton>
      </Forminator>
    );
  });
