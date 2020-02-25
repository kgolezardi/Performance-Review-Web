import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import graphql from 'babel-plugin-relay/macro';
import { importMDX } from 'mdx.macro';
import React, { Fragment, useContext } from 'react';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { PromptProvider } from 'src/shared/prompt';
import { SectionGuide } from 'src/shared/section-guide';
import { FCProps } from 'src/shared/types/FCProps';
import { UserType } from 'src/shared/utils/getUserLabel';
import { PeerReviewProjectsResult } from './PeerReviewProjectsResult';
import { PeerReviewProjectExpansionPanel } from './project-expansion-panel/PeerReviewProjectExpansionPanel';
import { PeerReviewProjectsTabQuery } from './__generated__/PeerReviewProjectsTabQuery.graphql';
import { PeerReviewProjectsTab_user$key } from './__generated__/PeerReviewProjectsTab_user.graphql';

const Content = importMDX.sync('./Guide.mdx');

const query = graphql`
  query PeerReviewProjectsTabQuery($revieweeId: ID!) {
    viewer {
      user(id: $revieweeId) {
        ...PeerReviewProjectsTab_user
      }
    }
  }
`;

const fragment = graphql`
  fragment PeerReviewProjectsTab_user on UserNode {
    id
    ...getUserLabel_user
    projectReviews {
      id
      comments {
        ...PeerReviewProjectsForm_projectComment
      }
      ...PeerReviewProjectsResult_projectReview
      ...PeerReviewProjectExpansionPanel_projectReview
    }
    personReview {
      state
    }
  }
`;

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

export function PeerReviewProjectsTab(props: Props) {
  const { revieweeId } = props;
  const components = useContext(MDXContext);
  const data = useLazyLoadQuery<PeerReviewProjectsTabQuery>(query, { revieweeId });
  const user = useFragment<PeerReviewProjectsTab_user$key>(fragment, data.viewer.user);
  const state = user?.personReview?.state;
  const projectReviews = user?.projectReviews;

  return (
    <Fragment>
      {state === 'DONE' ? (
        projectReviews?.map(projectReview => (
          <PeerReviewProjectsResult projectReview={projectReview} key={projectReview.id} />
        ))
      ) : (
        <Fragment>
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
                <PeerReviewProjectExpansionPanel projectReview={projectReview} key={projectReview.id} />
              ))}
            </PromptProvider>
          </Box>
        </Fragment>
      )}
    </Fragment>
  );
}
