import * as React from 'react';
import { Answer } from 'src/core/domain';

const AnswerOutputContext = React.createContext<Answer | null>(null);

export const useAnswerOutputContext = () => {
  const answer = React.useContext(AnswerOutputContext);

  if (answer === null) {
    throw new Error('useAnswerOutputContext must be used inside the AnswerOutputProvider');
  }

  return answer;
};

interface OwnProps {
  answer: Answer | undefined;
}

type Props = React.PropsWithChildren<OwnProps>;

export function AnswerOutputProvider(props: Props) {
  const { answer = { questionId: '', value: '' }, children } = props;

  return <AnswerOutputContext.Provider value={answer}>{children}</AnswerOutputContext.Provider>;
}
