import { Answers, Questions } from 'src/core/domain';

export const getQuestionsAnswersPair = (
  questions: Questions,
  answers: Answers,
): { pairs: [string, string][]; hasPairs: boolean } => {
  const pairs = [...questions].map<[string, string]>((question) => {
    const answer = answers.find((ans) => ans.questionId === question.id);
    const answerValue =
      question.questionType === 'CHECKBOX_MULTIPLE' ? answer?.value?.replace(/,/g, '، ') : answer?.value;
    return [question.label, answerValue ?? ''];
  });

  return {
    pairs,
    hasPairs: pairs.filter(([_, answer]) => Boolean(answer)).length > 0,
  };
};
