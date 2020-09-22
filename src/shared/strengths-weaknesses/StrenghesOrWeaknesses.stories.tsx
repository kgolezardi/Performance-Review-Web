import React from 'react';
import { DictInput, DictInputItem, Forminator } from 'src/shared/forminator';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator } from 'src/stories/decorators/StoryWrapperDecorator';

import { StrengthsOrWeaknesses } from './StrengthsOrWeaknesses';

storiesOf('Strengths and Weaknesses', module)
  .addDecorator(storyWrapperDecorator({ width: 800, height: 'auto' }))
  .add('Strengths', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <StrengthsOrWeaknesses maxLength={3} title="نقاط قوت" />
      </Forminator>
    );
  })
  .add('Strengths with initial value', () => {
    return (
      <Forminator onSubmit={action('submit')} initialValue={['', '']}>
        <StrengthsOrWeaknesses maxLength={3} title="نقاط قوت" />
      </Forminator>
    );
  })
  .add('Strengths and weaknesses', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="strength">
            <StrengthsOrWeaknesses maxLength={3} title="نقاط قوت" />
          </DictInputItem>
          <DictInputItem field="weaknesses">
            <StrengthsOrWeaknesses maxLength={3} title="نقاط ضعف" />
          </DictInputItem>
        </DictInput>
      </Forminator>
    );
  });
