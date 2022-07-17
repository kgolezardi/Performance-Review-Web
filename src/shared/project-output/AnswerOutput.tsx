import * as React from 'react';
import { MultilineOutput } from 'src/shared/multiline-output';

import { useAnswerOutputContext } from './AnswerOutputProvider';
import { useQuestionOutputContext } from './QuestionOutputProvider';

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export function AnswerOutput(props: Props) {
  const answer = useAnswerOutputContext();
  const question = useQuestionOutputContext();

  const text = question.questionType === 'CHECKBOX_MULTIPLE' ? answer.value.replace(',', ' ، ') : answer.value;

  return <MultilineOutput value={text} enableTruncating />;
}
