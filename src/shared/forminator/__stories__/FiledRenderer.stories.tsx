import React from 'react';
import { Question as IQuestion } from 'src/core/domain';
import { Question } from 'src/shared/DynamicFields';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import DictInput from '../inputs/dict-input/DictInput';
import SubmitButton from '../utils/SubmitButton';
import { Forminator } from '..';

const questions: IQuestion[] = [
  {
    questionType: 'TEXT',
    helpText: 'required name',
    id: 'q1',
    label: 'name',
    choices: null,
    order: 1,
    maxChoices: 5,
  },
  {
    questionType: 'TEXT',
    helpText: 'required last name',
    id: 'q2',
    label: 'name',
    choices: null,
    order: 0,
    maxChoices: 5,
  },
  {
    questionType: 'CHECKBOX_MULTIPLE',
    helpText: 'required sex',
    id: 'q3',
    label: 'sex',
    choices: ['male', 'female'],
    order: 2,
    maxChoices: 5,
  },
];
storiesOf('Forminator/Field Renderer', module)
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          {questions.map((question) => (
            <Question question={question} formData={{}} />
          ))}
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })

  .add('with initial value', () => {
    const initialValue = {
      answers: {
        q1: 'jamshid',
        q2: 'hashempoor',
        q3: 'male',
      },
    };
    return (
      <Forminator onSubmit={action('submit')} initialValue={initialValue}>
        <DictInput>
          {questions.map((question) => (
            <Question question={question} formData={initialValue} />
          ))}
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
