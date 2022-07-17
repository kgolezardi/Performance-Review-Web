import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import DictInput from '../inputs/dict-input/DictInput';
import SubmitButton from '../utils/SubmitButton';
import { DynamicFields, Forminator, Question, QuestionType } from '..';

const questions: QuestionType[] = [
  {
    questionType: 'TEXT',
    helpText: 'required name',
    id: 'q1',
    label: 'name',
    choices: null,
    order: 1,
    privateAnswerToPeerReviewers: true,
    privateAnswerToReviewee: false,
  },
  {
    questionType: 'TEXT',
    helpText: 'required last name',
    id: 'q2',
    label: 'name',
    choices: null,
    order: 0,
    privateAnswerToPeerReviewers: true,
    privateAnswerToReviewee: false,
  },
  {
    questionType: 'CHECKBOX_MULTIPLE',
    helpText: 'required sex',
    id: 'q3',
    label: 'sex',
    choices: ['male', 'female'],
    order: 2,
    privateAnswerToPeerReviewers: true,
    privateAnswerToReviewee: false,
  },
];
storiesOf('Forminator/Field Renderer', module)
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DynamicFields formData={{}} questions={questions} answersKey="answers">
            <Question />
          </DynamicFields>
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
          <DynamicFields formData={initialValue} questions={questions} answersKey="answers">
            <Question />
          </DynamicFields>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
