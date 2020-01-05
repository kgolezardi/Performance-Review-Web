import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { useFragment } from 'react-relay/hooks';
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

const CHAR_LIMIT = 100;

export function AchievementsIndicators(props: Props) {
  const projects = useFragment(fragment, props.projects);

  if (!projects.length) {
    return <AchievementsNoProjects />;
  }

  console.log(projects);
  return (
    <Fragment>
      {projects.map(project => {
        const value = getValue(project);
        return <ProjectProgress value={value} name={project.project.name} />;
      })}
    </Fragment>
  );
}

export const fragment = graphql`
  fragment AchievementsIndicators_projects on ProjectReviewNode @relay(plural: true) {
    project {
      name
    }
    rating
    reviewers {
      id
    }
    text
  }
`;

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer R> ? R : never;

const getValue = (project: ElementType<AchievementsIndicators_projects>) => {
  const { rating, text, reviewers } = project;
  const hasFilledRating = Boolean(rating);
  const hasFilledText = Boolean(text ? text.length >= CHAR_LIMIT : 0);
  const hasFilledReviewers = Boolean(reviewers.length);

  return ((Number(hasFilledRating) + 6 * Number(hasFilledText) + 3 * Number(hasFilledReviewers)) / 10) * 100;
};
