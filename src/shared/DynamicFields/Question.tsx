import * as React from 'react';
import { Question as IQuestion } from 'src/core/domain';

import DictInputItem from '../forminator/inputs/dict-input/DictInputItem';
import { FragmentPrompt } from '../forminator';
import { LimitedTextAreaQuestion } from './LimitedTextAreaQuestion';
import { MultipleSelectQuestion } from './MultipleSelectQuestion';

interface OwnProps {
  question: IQuestion;
  answersKey?: string;
  enablePrompt?: boolean;
  formData: Record<string, any>;
}

type Props = React.PropsWithChildren<OwnProps>;

export function Question(props: Props) {
  const { answersKey = 'answers', question, enablePrompt = true, formData } = props;
  const { id, questionType } = question;

  const initialValue = questionType === 'CHECKBOX_MULTIPLE' ? [] : '';

  const fieldValue = formData[answersKey][id] ?? initialValue;

  return (
    <DictInputItem field={`${answersKey}.${id}`}>
      {questionType === 'TEXT' ? (
        <LimitedTextAreaQuestion question={question} />
      ) : (
        <MultipleSelectQuestion question={question} />
      )}
      {enablePrompt && <FragmentPrompt value={fieldValue} />}
      {props.children}
    </DictInputItem>
  );
}
