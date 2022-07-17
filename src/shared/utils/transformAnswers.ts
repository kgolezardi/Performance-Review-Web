import { Answers } from 'src/core/domain';
import { QuestionType } from 'src/__generated__/enums';

interface Question {
  readonly id: string;
  readonly questionType: QuestionType;
  readonly order: number;
  readonly label: string;
  readonly helpText: string | null;
  readonly choices: ReadonlyArray<string> | null;
  readonly privateAnswerToPeerReviewers: boolean;
  readonly privateAnswerToReviewee: boolean;
}

export const transformAnswersToInput = (ans: Record<string, any>, questions: ReadonlyArray<Question>) => {
  return Object.entries(ans).map(([key, value]) => {
    const question = questions.find((q) => q.id === key);
    return {
      questionId: key,
      value: question?.questionType === 'CHECKBOX_MULTIPLE' ? value.join(',') : value,
    };
  });
};

export const transformAnswersToFormData = (answers: Answers, questions: ReadonlyArray<Question>) => {
  return answers.reduce((acc, curr) => {
    const question = questions.find((q) => q.id === curr.questionId);
    return {
      ...acc,
      [curr.questionId]: question?.questionType === 'CHECKBOX_MULTIPLE' ? curr.value.split(',') : curr.value,
    };
  }, {});
};
