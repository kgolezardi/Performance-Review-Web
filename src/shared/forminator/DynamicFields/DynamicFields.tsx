import * as React from 'react';
import { QuestionType } from 'src/__generated__/enums';
import { sort } from 'ramda';

import { QuestionProvider } from './providers/QuestionProvider';

export interface Question {
  readonly id: string;
  readonly questionType: QuestionType;
  readonly order: number;
  readonly label: string;
  readonly helpText: string | null;
  readonly choices: ReadonlyArray<string> | null;
  readonly privateAnswerToPeerReviewers: boolean;
  readonly privateAnswerToReviewee: boolean;
}

interface OwnProps<T> {
  questions: ReadonlyArray<Question>;
  answersKey: string;
  formData: Record<string, any>;
}

type Props<T> = React.PropsWithChildren<OwnProps<T>>;

export function DynamicFields<T>(props: Props<T>) {
  const { answersKey, questions, children, formData } = props;

  const sortedQuestion = sort((a, b) => a.order - b.order, questions);

  return (
    <React.Fragment>
      {sortedQuestion.map((question) => (
        <QuestionProvider key={question.id} question={question} answersKey={answersKey} formData={formData}>
          {children}
        </QuestionProvider>
      ))}
    </React.Fragment>
  );
}
