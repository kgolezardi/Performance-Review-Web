import { Answer, Answers, Questions } from 'src/core/domain';
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
  return Object.entries(ans).reduce<Answer[]>((acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    const question = questions.find((q) => q.id === key);
    return acc.concat({
      questionId: key,
      value: question?.questionType === 'CHECKBOX_MULTIPLE' ? value.join(',') : value,
    });
  }, []);
};

export const transformAnswersToFormData = (answers: Answers, questions: Questions) => {
  return answers.reduce((acc, curr) => {
    if (!curr.value) {
      return acc;
    }

    const question = [...questions].find((q) => q.id === curr.questionId);
    return {
      ...acc,
      [curr.questionId]: (question?.questionType === 'CHECKBOX_MULTIPLE' ? curr?.value?.split(',') : curr.value) ?? '',
    };
  }, {});
};
