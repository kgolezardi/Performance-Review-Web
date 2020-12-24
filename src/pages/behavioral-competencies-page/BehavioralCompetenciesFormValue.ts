import { Evaluation } from 'src/__generated__/enums';

export interface BehavioralCompetenciesFormValue {
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
