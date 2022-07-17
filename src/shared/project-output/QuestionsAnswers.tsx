import * as React from 'react';
import { Answers } from 'src/core/domain';
import { RoundQuestionsContextValue } from 'src/core/round-questions/RoundQuestionsContext';
import { useRoundQuestionsContext } from 'src/core/round-questions';

import { AnswerOutputProvider } from './AnswerOutputProvider';
import { QuestionOutputProvider } from './QuestionOutputProvider';

interface OwnProps {
  whichQuestions: keyof RoundQuestionsContextValue;
  answers: Answers;
}

type Props = React.PropsWithChildren<OwnProps>;

export function QuestionsAnswers(props: Props) {
  const { whichQuestions, answers, children } = props;

  const allQuestions = useRoundQuestionsContext();
  const currentQuestions = [...allQuestions[whichQuestions]];

  const getAnswer = (id: string) => answers.find((ans) => ans.questionId === id);

  return (
    <>
      {currentQuestions.map((question) => (
        <QuestionOutputProvider key={question.id} question={question}>
          <AnswerOutputProvider answer={getAnswer(question.id)}>{children}</AnswerOutputProvider>
        </QuestionOutputProvider>
      ))}
    </>
  );
}
