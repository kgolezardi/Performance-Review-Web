import * as React from 'react';
import { Answers } from 'src/core/domain';
import { MultilineOutput } from 'src/shared/multiline-output';
import { QuestionType } from 'src/__generated__/enums';

interface OwnProps {
  answers: Answers;
  questionId: string;
  questionType: QuestionType;
}

type Props = React.PropsWithChildren<OwnProps>;

export function AnswerOutput(props: Props) {
  const { answers, questionId, questionType } = props;

  const answer = answers.find((ans) => ans.questionId === questionId);

  const text = questionType === 'CHECKBOX_MULTIPLE' ? answer?.value?.replace(',', '، ') : answer?.value;

  return <MultilineOutput value={text ?? null} enableTruncating />;
}
