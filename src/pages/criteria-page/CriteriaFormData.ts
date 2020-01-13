import { Evaluation } from './__generated__/CriteriaPageMutation.graphql';

export interface CriteriaFormData {
  sahabinessRating?: Evaluation;
  sahabinessComment?: string;
  problemSolvingRating?: Evaluation;
  problemSolvingComment?: string;
  executionRating?: Evaluation;
  executionComment?: string;
  thoughtLeadershipRating?: Evaluation;
  thoughtLeadershipComment?: string;
  leadershipRating?: Evaluation;
  leadershipComment?: string;
  presenceRating?: Evaluation;
  presenceComment?: string;
}
