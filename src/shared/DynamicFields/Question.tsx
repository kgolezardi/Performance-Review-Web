import * as React from 'react';
import DictInputItem from 'src/shared/forminator/inputs/dict-input/DictInputItem';
import { FragmentPrompt } from 'src/shared/forminator';
import { Question as IQuestion } from 'src/core/domain';
import { LimitedTextAreaInputClasses } from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import { SelectMultiAutoCompleteClasses } from 'src/shared/forminator/inputs/SelectMultiAutoComplete';

import { LimitedTextAreaQuestion } from './LimitedTextAreaQuestion';
import { MultipleSelectQuestion } from './MultipleSelectQuestion';

interface OwnProps {
  question: IQuestion;
  answersKey?: string;
  enablePrompt?: boolean;
  formData: Record<string, any>;
}

type Props = React.PropsWithChildren<OwnProps> & (LimitedTextAreaInputClasses | SelectMultiAutoCompleteClasses);

export function Question(props: Props) {
  const { answersKey = 'answers', question, enablePrompt = true, formData, classes } = props;
  const { id, questionType } = question;

  const initialValue = questionType === 'CHECKBOX_MULTIPLE' ? [] : '';

  const fieldValue = formData[answersKey][id] ?? initialValue;

  return (
    <DictInputItem field={`${answersKey}.${id}`}>
      {questionType === 'TEXT' ? (
        <LimitedTextAreaQuestion question={question} classes={classes} />
      ) : (
        <MultipleSelectQuestion question={question} classes={classes} />
      )}
      {enablePrompt && <FragmentPrompt value={fieldValue} />}
      {props.children}
    </DictInputItem>
  );
}
