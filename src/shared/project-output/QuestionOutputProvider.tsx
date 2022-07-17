import * as React from 'react';
import { QuestionType } from 'src/__generated__/enums';

type Question = {
  readonly id: string;
  readonly questionType: QuestionType;
  readonly order: number;
  readonly label: string;
  readonly helpText: string | null;
  readonly choices: ReadonlyArray<string> | null;
};

const QuestionOutputContext = React.createContext<Question | null>(null);

export const useQuestionOutputContext = () => {
  const question = React.useContext(QuestionOutputContext);

  if (question === null) {
    throw new Error('useQuestionOutputContext must be used inside the QuestionOutputProvider');
  }

  return question;
};

interface OwnProps {
  question: Question;
}

type Props = React.PropsWithChildren<OwnProps>;

export function QuestionOutputProvider(props: Props) {
  const { question, children } = props;

  return <QuestionOutputContext.Provider value={question}>{children}</QuestionOutputContext.Provider>;
}
