import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';
import { saveProjectCommentMutation } from './__generated__/saveProjectCommentMutation.graphql';

export const useSaveProjectComment = () =>
  useMutation<saveProjectCommentMutation>(graphql`
    mutation saveProjectCommentMutation($input: SaveProjectCommentMutationInput!, $projectReviewId: ID!) {
      saveProjectComment(input: $input) {
        viewer {
          projectReview(id: $projectReviewId) {
            ...ProjectPeerReviewItem_projectReview
          }
        }
        projectComment {
          ...ProjectPeerReviewForm_projectComment
        }
      }
    }
  `);
