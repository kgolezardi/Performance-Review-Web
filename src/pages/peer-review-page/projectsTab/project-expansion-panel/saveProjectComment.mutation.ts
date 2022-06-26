import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'src/relay';

import { saveProjectCommentMutation } from './__generated__/saveProjectCommentMutation.graphql';

export const useSaveProjectComment = () =>
  useMutation<saveProjectCommentMutation>(graphql`
    mutation saveProjectCommentMutation($input: SaveProjectCommentMutationInput!) {
      saveProjectComment(input: $input) {
        projectComment {
          projectReview {
            reviewee {
              peerPersonReview {
                state
              }
            }
          }
          ...PeerReviewProjectsForm_projectComment
        }
      }
    }
  `);
