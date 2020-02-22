import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import graphql from 'babel-plugin-relay/macro';
import { importMDX } from 'mdx.macro';
import React, { useContext } from 'react';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { ProjectPeerReviewItem } from 'src/shared/project-peer-review-item';
import { PromptProvider } from 'src/shared/prompt';
import { SectionGuide } from 'src/shared/section-guide';
import { FCProps } from 'src/shared/types/FCProps';
import { UserType } from 'src/shared/utils/getUserLabel';
import { ProjectCommentPageQuery } from './__generated__/ProjectCommentPageQuery.graphql';
import { ProjectCommentPage_user$key } from './__generated__/ProjectCommentPage_user.graphql';

const Content = importMDX.sync('./Guide.mdx');

const query = graphql`
  query ProjectCommentPageQuery($revieweeId: ID!) {
    viewer {
      user(id: $revieweeId) {
        ...ProjectCommentPage_user
        projectReviews {
          id
          ...ProjectPeerReviewItem_projectReview
        }
      }
    }
  }
`;

const fragmentUserNode = graphql`
  fragment ProjectCommentPage_user on UserNode {
    id
    ...getUserLabel_user
  }
`;

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

export function ProjectCommentPage(props: Props) {
  const { revieweeId } = props;
  const components = useContext(MDXContext);
  const data = useLazyLoadQuery<ProjectCommentPageQuery>(query, { revieweeId });
  const user = useFragment<ProjectCommentPage_user$key>(fragmentUserNode, data.viewer.user);
  const projectReviews = data.viewer.user?.projectReviews;

  return (
    <>
      <Box padding={3} paddingTop={4}>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <SectionGuide>
              <MDXPropsProvider<UserType | null> value={user}>
                <Content components={components} />
              </MDXPropsProvider>
            </SectionGuide>
          </Grid>
        </Grid>
      </Box>
      <Box paddingY={2}>
        <PromptProvider message={i18n._('Changes you made may not be saved.')}>
          {projectReviews?.map(projectReview => (
            <ProjectPeerReviewItem projectReview={projectReview} key={projectReview.id} />
          ))}
        </PromptProvider>
      </Box>
    </>
  );
}
