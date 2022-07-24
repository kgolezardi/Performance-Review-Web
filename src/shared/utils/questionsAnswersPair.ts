import { Answers, Questions } from 'src/core/domain';

export const getQuestionsAnswersPair = (questions: Questions, answers: Answers): [string, string][] => {
  return [...questions].map((question) => {
    const answer = answers.find((ans) => ans.questionId === question.id);
    const answerValue =
      question.questionType === 'CHECKBOX_MULTIPLE' ? answer?.value?.replace(',', ' ،') : answer?.value;
    return [question.label, answerValue ?? ''];
  });
};
