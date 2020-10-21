import { Evaluation } from 'src/__generated__/enums';

export interface ManagerReviewOverallEvaluationValue {
  revieweeId: string;
  overallRating?: Evaluation;
}
