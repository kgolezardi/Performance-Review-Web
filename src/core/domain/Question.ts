import { QuestionType } from 'src/__generated__/enums';

import { RoundQuestions_managerReview } from '../round-questions/__generated__/RoundQuestions_managerReview.graphql';
import { RoundQuestions_peerReview } from '../round-questions/__generated__/RoundQuestions_peerReview.graphql';
import { RoundQuestions_selfReview } from '../round-questions/__generated__/RoundQuestions_selfReview.graphql';

export type Questions = RoundQuestions_selfReview | RoundQuestions_peerReview | RoundQuestions_managerReview;

export interface Question {
  readonly id: string;
  readonly questionType: QuestionType;
  readonly order: number;
  readonly label: string;
  readonly helpText: string | null;
  readonly choices: ReadonlyArray<string> | null;
  readonly maxChoices: number;
}
