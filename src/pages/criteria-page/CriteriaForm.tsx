import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import graphql from 'babel-plugin-relay/macro';
import { importMDX } from 'mdx.macro';
import React, { useContext } from 'react';
import { useFragment } from 'react-relay/hooks';
import { CriterionItem } from 'src/shared/criterion-item';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { SectionGuide } from 'src/shared/section-guide';
import { ServerValueProvider } from 'src/shared/server-value';
import { StickyActionBar } from 'src/shared/sticky-action-bar/StickyActionBar';
import { FCProps } from 'src/shared/types/FCProps';
import { UserType } from 'src/shared/utils/getUserLabel';
import { CriteriaForm_user$key } from './__generated__/CriteriaForm_user.graphql';
import { CriteriaFormData } from './CriteriaFormData';
import { usePeerReviewContext } from 'src/pages/peer-review-page/PeerReviewContext';

// self review helper texts
const OrganizationCultureAdoptionContentSelfReview = importMDX.sync(
  './help-texts/self-review/OrganizationCultureAdoptionContent.mdx',
);
const ProblemSolvingContentSelfReview = importMDX.sync('./help-texts/self-review/ProblemSolvingContent.mdx');
const ExecutionContentSelfReview = importMDX.sync('./help-texts/self-review/ExecutionContent.mdx');
const LeadershipContentSelfReview = importMDX.sync('./help-texts/self-review/LeadershipContent.mdx');
const ThoughtLeadershipContentSelfReview = importMDX.sync('./help-texts/self-review/ThoughtLeadershipContent.mdx');
const PresenceContentSelfReview = importMDX.sync('./help-texts/self-review/PresenceContent.mdx');
const DescriptionContentSelfReview = importMDX.sync('./help-texts/self-review/DescriptionContent.mdx');

// peer review helper texts
const OrganizationCultureAdoptionContentPeerReview = importMDX.sync(
  './help-texts/peer-review/OrganizationCultureAdoptionContent.mdx',
);
const ProblemSolvingContentPeerReview = importMDX.sync('./help-texts/peer-review/ProblemSolvingContent.mdx');
const ExecutionContentPeerReview = importMDX.sync('./help-texts/peer-review/ExecutionContent.mdx');
const LeadershipContentPeerReview = importMDX.sync('./help-texts/peer-review/LeadershipContent.mdx');
const ThoughtLeadershipContentPeerReview = importMDX.sync('./help-texts/peer-review/ThoughtLeadershipContent.mdx');
const PresenceContentPeerReview = importMDX.sync('./help-texts/peer-review/PresenceContent.mdx');
const DescriptionContentPeerReview = importMDX.sync('./help-texts/peer-review/DescriptionContent.mdx');

interface OwnProps {
  initialValue?: CriteriaFormData;
  isSelfReview: boolean;
  onSubmit: (data: CriteriaFormData) => void;
  user: CriteriaForm_user$key | null;
}

type Props = FCProps<OwnProps>;

export function CriteriaForm(props: Props) {
  const { onSubmit, isSelfReview } = props;
  const components = useContext(MDXContext);
  const user = useFragment(fragmentUserNode, props.user);
  const reviewType = isSelfReview ? 'self' : 'peer';
  const showSaveButton = usePeerReviewContext()?.state !== 'DONE' ?? true;

  return (
    <ServerValueProvider value={props.initialValue}>
      <Forminator onSubmit={onSubmit} initialValue={props.initialValue}>
        <Grid container spacing={2}>
          <DictInput>
            <Grid item xs={12}>
              <SectionGuide>
                {isSelfReview ? (
                  <DescriptionContentSelfReview components={components} />
                ) : (
                  <MDXPropsProvider<UserType | null> value={user}>
                    <DescriptionContentPeerReview components={components} />
                  </MDXPropsProvider>
                )}
              </SectionGuide>
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Organization Culture Adoption')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <OrganizationCultureAdoptionContentSelfReview components={components} />
                  ) : (
                    <OrganizationCultureAdoptionContentPeerReview components={components} />
                  )
                }
                prefix="sahabiness"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Problem Solving')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <ProblemSolvingContentSelfReview components={components} />
                  ) : (
                    <ProblemSolvingContentPeerReview components={components} />
                  )
                }
                prefix="problemSolving"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Execution')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <ExecutionContentSelfReview components={components} />
                  ) : (
                    <ExecutionContentPeerReview components={components} />
                  )
                }
                prefix="execution"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Thought Leadership')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <ThoughtLeadershipContentSelfReview components={components} />
                  ) : (
                    <ThoughtLeadershipContentPeerReview components={components} />
                  )
                }
                prefix="thoughtLeadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Leadership')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <LeadershipContentSelfReview components={components} />
                  ) : (
                    <LeadershipContentPeerReview components={components} />
                  )
                }
                prefix="leadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Presence')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <PresenceContentSelfReview components={components} />
                  ) : (
                    <PresenceContentPeerReview components={components} />
                  )
                }
                prefix="presence"
              />
            </Grid>
          </DictInput>
          {showSaveButton && (
            <StickyActionBar>
              <SubmitButton variant="contained" color="primary">
                {i18n._('Save')}
              </SubmitButton>
            </StickyActionBar>
          )}
        </Grid>
      </Forminator>
    </ServerValueProvider>
  );
}

const fragmentUserNode = graphql`
  fragment CriteriaForm_user on UserNode {
    id
    ...getUserLabel_user
  }
`;
