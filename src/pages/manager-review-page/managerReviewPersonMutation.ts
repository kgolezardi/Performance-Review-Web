import graphql from 'babel-plugin-relay/macro';

export const managerReviewPersonMutation = graphql`
  mutation managerReviewPersonMutation($input: SaveManagerPersonReviewMutationInput!) {
    saveManagerPersonReview(input: $input) {
      managerPersonReview {
        overallRating
        strengths
        weaknesses
      }
    }
  }
`;
