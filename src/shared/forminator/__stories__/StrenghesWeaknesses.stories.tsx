import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { storyWrapperDecorator } from 'src/stories/decorators/StoryWrapperDecorator';
import { Forminator } from 'src/shared/forminator';
import StrengthsWeaknesses from 'src/shared/strengths-weaknesses/StrengthsWeaknesses';

storiesOf('Strengths and Weaknesses', module)
  .addDecorator(themeDecorator({ direction: 'ltr' }))
  .addDecorator(storyWrapperDecorator({ width: 800, height: 'auto' }))
  .add('Strengths', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <StrengthsWeaknesses title="نقاط قوت" />
      </Forminator>
    );
  });
