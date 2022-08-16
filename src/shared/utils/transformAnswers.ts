import { Answers, Questions } from 'src/core/domain';

export const transformAnswersToInput = (ans: Record<string, any>, questions: Questions) => {
  return Object.entries(ans)
    .filter(([_, value]) => Boolean(value))
    .map(([key, value]) => {
      const question = [...questions].find((q) => q.id === key);
      return {
        questionId: key,
        value: question?.questionType === 'CHECKBOX_MULTIPLE' ? value.join(',') : value,
      };
    });
};

export const transformAnswersToFormData = (answers: Answers, questions: Questions): Record<string, string> => {
  return answers
    .filter((answer) => Boolean(answer.value))
    .reduce((acc, curr) => {
      const question = [...questions].find((q) => q.id === curr.questionId);
      return {
        ...acc,
        [curr.questionId]:
          (question?.questionType === 'CHECKBOX_MULTIPLE' ? curr?.value?.split(',') : curr.value) ?? '',
      };
    }, {});
};
