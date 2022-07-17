import * as React from 'react';

import DictInputItem from '../inputs/dict-input/DictInputItem';
import { LimitedTextAreaQuestion } from './LimitedTextAreaQuestion';
import { MultipleSelectQuestion } from './MultipleSelectQuestion';
import { useQuestionContext } from './providers/QuestionProvider';

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export function Question(props: Props) {
  const { answersKey, question } = useQuestionContext();
  const { id, questionType } = question;

  return (
    <DictInputItem field={`${answersKey}.${id}`}>
      {questionType === 'TEXT' ? <LimitedTextAreaQuestion /> : <MultipleSelectQuestion />}
      {props.children}
    </DictInputItem>
  );
}
