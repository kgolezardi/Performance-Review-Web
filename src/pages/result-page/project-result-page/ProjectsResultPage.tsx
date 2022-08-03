import { Box } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectResultExpansionPanel } from './ProjectResultExpansionPanel';
import { ProjectsResultPageQuery } from './__generated__/ProjectsResultPageQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

export type Props = FCProps<OwnProps>;

const query = graphql`
  query ProjectsResultPageQuery($id: ID!) {
    viewer {
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
  return (
    <Box paddingY={2}>
      {projectReviews?.map((projectReview) => (
        <ProjectResultExpansionPanel projectReview={projectReview} key={projectReview.id} />
      ))}
    </Box>
  );
}
