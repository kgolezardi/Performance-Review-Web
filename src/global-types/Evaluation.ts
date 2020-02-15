import { i18n } from '@lingui/core';

export enum Evaluation {
  'EXCEEDS_EXPECTATIONS' = 'EXCEEDS_EXPECTATIONS',
  'MEETS_EXPECTATIONS' = 'MEETS_EXPECTATIONS',
  'NEEDS_IMPROVEMENT' = 'NEEDS_IMPROVEMENT',
  'SUPERB' = 'SUPERB',
}

export const selfReviewEvaluationDictionary: Record<Evaluation, string> = {
  [Evaluation.NEEDS_IMPROVEMENT]: i18n._('I Need Improvement'),
  [Evaluation.MEETS_EXPECTATIONS]: i18n._('Meets Expectations from me'),
  [Evaluation.EXCEEDS_EXPECTATIONS]: i18n._('Exceeds Expectations from me'),
  [Evaluation.SUPERB]: i18n._('Superb'),
};

export const peerReviewEvaluationDictionary: Record<Evaluation, string> = {
  [Evaluation.NEEDS_IMPROVEMENT]: i18n._('He/She Needs Improvement'),
  [Evaluation.MEETS_EXPECTATIONS]: i18n._('Meets Expectations from Him/Her'),
  [Evaluation.EXCEEDS_EXPECTATIONS]: i18n._('Exceeds Expectations from Him/Her'),
  [Evaluation.SUPERB]: i18n._('Superb'),
};
