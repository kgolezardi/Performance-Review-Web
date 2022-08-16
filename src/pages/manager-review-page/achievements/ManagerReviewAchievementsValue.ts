import { Evaluation } from 'src/__generated__/enums';

export interface ManageReviewFormData {
  projectReviewId: string;
  rating: Evaluation | null;
  answers: Record<string, string>;
}
