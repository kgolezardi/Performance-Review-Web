import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { useFragment } from 'react-relay/hooks';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
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

  if (!projects.length) {
    return <AchievementsNoProjects />;
  }

  return (
    <Fragment>
      {projects.map(project => {
        const value = getValue(project);
        return <ProjectProgress key={project.project.id} value={value} name={project.project.name} />;
      })}
    </Fragment>
  );
}

export const fragment = graphql`
  fragment AchievementsIndicators_projects on ProjectReviewNode @relay(plural: true) {
    project {
      name
      id
    }
    rating
    reviewers {
      id
    }
    text
  }
`;

const getValue = (project: ElementType<AchievementsIndicators_projects>) => {
  const { rating, text, reviewers } = project;
  const hasFilledRating = Boolean(rating);
  const hasFilledText = Boolean(text);
  const hasFilledReviewers = Boolean(reviewers.length);

  return ((Number(hasFilledRating) + 6 * Number(hasFilledText) + 3 * Number(hasFilledReviewers)) / 10) * 100;
};
