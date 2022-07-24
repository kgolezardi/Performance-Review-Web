import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import { RoundQuestions_selfReview } from 'src/core/round-questions/__generated__/RoundQuestions_selfReview.graphql';
import { innerJoin, prop } from 'ramda';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import {
  AchievementsIndicators_projects,
  AchievementsIndicators_projects$key,
} from './__generated__/AchievementsIndicators_projects.graphql';
import { AchievementsNoProjects } from './AchievementsNoProjects';
import { ProjectProgress } from './ProjectProgress';

interface OwnProps {
  projects: AchievementsIndicators_projects$key;
}

type Props = FCProps<OwnProps>;

export function AchievementsIndicators(props: Props) {
  const projects = useFragment(fragment, props.projects);
  const { selfReviewProjectQuestions } = useRoundQuestions();

  if (!projects.length) {
    return <AchievementsNoProjects />;
  }

  return (
    <Fragment>
      {projects.map((project) => {
        const value = getValue(project, selfReviewProjectQuestions);
        return (
          <ProjectProgress
            key={project.id}
            value={value}
            name={project.projectName}
            consultedWithManager={project.consultedWithManager}
          />
        );
      })}
    </Fragment>
  );
}

export const fragment = graphql`
  fragment AchievementsIndicators_projects on ProjectReviewNode @relay(plural: true) {
    id
    projectName
    rating
    reviewers {
      id
    }
    consultedWithManager
    answers {
      value
      questionId
    }
  }
`;

const getValue = (project: ElementType<AchievementsIndicators_projects>, questions: RoundQuestions_selfReview) => {
  const { rating, answers, reviewers } = project;
  const roundAnswers = innerJoin((a, b) => a.questionId === b.id, answers, questions);
  const hasFilledRating = Boolean(rating);
  const filledText = roundAnswers.filter(prop('value'));
  const hasFilledReviewers = Boolean(reviewers.length);

  return (
    ((Number(hasFilledRating) + 6 * (filledText.length / questions.length) + 3 * Number(hasFilledReviewers)) / 10) * 100
  );
};
