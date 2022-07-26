import graphql from 'babel-plugin-relay/macro';

export const query = graphql`
  query RoundQuestionsQuery {
    viewer {
      activeRound {
        selfReviewProjectQuestions {
          ...RoundQuestions_selfReview
        }
        peerReviewProjectQuestions {
          ...RoundQuestions_peerReview
        }
        managerReviewProjectQuestions {
          ...RoundQuestions_managerReview
        }
      }
    }
  }
`;

export const selfReviewProjectQuestionsFragment = graphql`
  fragment RoundQuestions_selfReview on QuestionNode @relay(plural: true) {
    id
    questionType
    order
    label
    helpText
    choices
    maxChoices
  }
`;

export const peerReviewProjectQuestionsFragment = graphql`
  fragment RoundQuestions_peerReview on QuestionNode @relay(plural: true) {
    id
    questionType
    order
    label
    helpText
    choices
    maxChoices
  }
`;

export const managerReviewProjectQuestionsFragment = graphql`
  fragment RoundQuestions_managerReview on QuestionNode @relay(plural: true) {
    id
    questionType
    order
    label
    helpText
    choices
    maxChoices
  }
`;
