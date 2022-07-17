import * as React from 'react';

import { Question } from '../DynamicFields';

interface QuestionContextValue {
  question: Question;
  formData: Record<string, any>;
  answersKey: string;
}

const QuestionContext = React.createContext<QuestionContextValue | null>(null);

export const useQuestionContext = () => {
  const question = React.useContext(QuestionContext);

  if (question === null) {
    throw new Error('useQuestionContext must be used inside the QuestionProvider');
  }

  return question;
};

interface OwnProps extends QuestionContextValue {}

type Props = React.PropsWithChildren<OwnProps>;

export function QuestionProvider(props: Props) {
  const { formData, question, answersKey, children } = props;

  const value = React.useMemo(() => ({ question, formData, answersKey }), [answersKey, formData, question]);

  return <QuestionContext.Provider value={value}>{children}</QuestionContext.Provider>;
}
