import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ProjectResultExpansionPanel } from './ProjectResultExpansionPanel';
import { ProjectsResultPageQuery } from './__generated__/ProjectsResultPageQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

export type Props = FCProps<OwnProps>;

const query = graphql`
  query ProjectsResultPageQuery($id: ID!) {
    viewer {
      activeRound {
        reviewersAreAnonymous
      }
      user(id: $id) {
        projectReviews {
          id
          ...ProjectResultExpansionPanel_projectReview
        }
      }
    }
  }
`;

export function ProjectsResultPage(props: Props) {
  const data = useLazyLoadQuery<ProjectsResultPageQuery>(query, { id: props.revieweeId });
  const projectReviews = data.viewer.user?.projectReviews;
  const reviewersAreAnonymous = data.viewer.activeRound.reviewersAreAnonymous;

  return (
    <Box paddingY={2}>
      {projectReviews?.map((projectReview) => (
        <ProjectResultExpansionPanel
          reviewersAreAnonymous={reviewersAreAnonymous}
          projectReview={projectReview}
          key={projectReview.id}
        />
      ))}
    </Box>
  );
}
