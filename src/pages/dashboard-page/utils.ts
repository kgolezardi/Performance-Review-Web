import { AchievementsIndicators_projects } from './__generated__/AchievementsIndicators_projects.graphql';
import { DominantCharacteristicsCircularIndicator_review } from './__generated__/DominantCharacteristicsCircularIndicator_review.graphql';
import { FinalSubmission_dominantCharacteristics } from './__generated__/FinalSubmission_dominantCharacteristics.graphql';
import { FinalSubmission_performanceCompetencies } from './__generated__/FinalSubmission_performanceCompetencies.graphql';
import { FinalSubmission_projects } from './__generated__/FinalSubmission_projects.graphql';
import { PerformanceCompetenciesCircularIndicator_review } from './__generated__/PerformanceCompetenciesCircularIndicator_review.graphql';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer R> ? R : never;

const ACHIEVEMENTS_CHAR_LIMIT = 100;
const MAX_WEAKNESSES = 3;
const MAX_STRENGTHS = 3;

const getLength = (obj: object | null) => {
  if (obj === null) {
    return 0;
  }
  return Object.keys(obj).length;
};

export const getNumberOfFilledFieldsOfPerformanceCompetencies = (
  review: PerformanceCompetenciesCircularIndicator_review | FinalSubmission_performanceCompetencies | null,
): number => {
  if (review === null) {
    return 0;
  }

  const keys = Object.keys(review) as [keyof PerformanceCompetenciesCircularIndicator_review];
  const items = keys.map(key => Boolean(review[key]));
  return items.filter(Boolean).length;
};

export const getPerformanceCompetenciesValue = (
  review: PerformanceCompetenciesCircularIndicator_review | FinalSubmission_performanceCompetencies | null,
) => {
  const numberOfFilledFields = getNumberOfFilledFieldsOfPerformanceCompetencies(review);
  const length = getLength(review);
  if (length) {
    return (numberOfFilledFields / length) * 100;
  }
  return 0;
};

export const getNumberOfFilledFieldsOfDominantCharacteristics = (
  review: DominantCharacteristicsCircularIndicator_review | FinalSubmission_dominantCharacteristics | null,
) => {
  if (review === null) {
    return { numberOfStrengths: 0, numberOfWeaknesses: 0 };
  }
  const strengths: ReadonlyArray<any> = review.strengths || [];
  const weaknesses: ReadonlyArray<any> = review.weaknesses || [];

  const numberOfStrengths = strengths.filter(Boolean).length;
  const numberOfWeaknesses = weaknesses.filter(Boolean).length;

  return { numberOfStrengths, numberOfWeaknesses };
};

export const getDominantCharacteristicsValue = (
  review: DominantCharacteristicsCircularIndicator_review | FinalSubmission_dominantCharacteristics | null,
) => {
  const { numberOfWeaknesses, numberOfStrengths } = getNumberOfFilledFieldsOfDominantCharacteristics(review);
  return ((numberOfStrengths + numberOfWeaknesses) / (MAX_STRENGTHS + MAX_WEAKNESSES)) * 100;
};

export const getAchievementValue = (
  project: ElementType<AchievementsIndicators_projects | FinalSubmission_projects>,
) => {
  const { rating, text, reviewers } = project;
  const hasFilledRating = Boolean(rating);
  const hasFilledText = Boolean(text ? text.length >= ACHIEVEMENTS_CHAR_LIMIT : 0);
  const hasFilledReviewers = Boolean(reviewers.length);

  return ((Number(hasFilledRating) + 6 * Number(hasFilledText) + 3 * Number(hasFilledReviewers)) / 10) * 100;
};
