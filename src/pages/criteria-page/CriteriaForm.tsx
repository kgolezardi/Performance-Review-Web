import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { ActionBar } from 'src/shared/action-bar';
import { CriteriaHelpText } from 'src/shared/criteria-help-text';
import { CriterionItem } from 'src/shared/criterion-item';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid } from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { ServerValueProvider } from 'src/shared/server-value';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { useFragment } from 'react-relay/hooks';

import { CriteriaFormValue } from './CriteriaFormValue';
import { CriteriaForm_review$key } from './__generated__/CriteriaForm_review.graphql';

// self review helper texts
const DescriptionContentSelfReview = importMDX.sync('./help-texts/self-review/DescriptionContent.mdx');

// peer review helper texts
const DescriptionContentPeerReview = importMDX.sync('./help-texts/peer-review/DescriptionContent.mdx');

const fragment = graphql`
  fragment CriteriaForm_review on PersonReviewNode {
    sahabinessComment
    sahabinessRating
    problemSolvingComment
    problemSolvingRating
    executionComment
    executionRating
    thoughtLeadershipComment
    thoughtLeadershipRating
    leadershipComment
    leadershipRating
    presenceComment
    presenceRating
  }
`;

interface OwnProps {
  review: CriteriaForm_review$key | null;
  isSelfReview: boolean;
  onSubmit: (data: CriteriaFormValue) => void;
}

type Props = FCProps<OwnProps>;

export function CriteriaForm(props: Props) {
  const { onSubmit, isSelfReview } = props;
  const components = useContext(MDXContext);
  const review = useFragment(fragment, props.review);
  const reviewType = isSelfReview ? 'self' : 'peer';

  // if review properties are null, replace it with undefined
  let value: CriteriaFormValue = {};
  for (const key in review) {
    Object.assign(value, { [key]: review?.[key as keyof CriteriaFormValue] ?? undefined });
  }

  return (
    <ServerValueProvider value={value}>
      <Forminator onSubmit={onSubmit} initialValue={value}>
        <Grid container spacing={4}>
          <DictInput>
            <Grid item xs={12}>
              <SectionGuide>
                {isSelfReview ? (
                  <DescriptionContentSelfReview components={components} />
                ) : (
                  <DescriptionContentPeerReview components={components} />
                )}
              </SectionGuide>
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Organization Culture Adoption')}
                type={reviewType}
                details={<CriteriaHelpText criteria="sahabiness" isSelfReview={isSelfReview} />}
                prefix="sahabiness"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Problem Solving')}
                type={reviewType}
                details={<CriteriaHelpText criteria="problemSolving" isSelfReview={isSelfReview} />}
                prefix="problemSolving"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Execution')}
                type={reviewType}
                details={<CriteriaHelpText criteria="execution" isSelfReview={isSelfReview} />}
                prefix="execution"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Thought Leadership')}
                type={reviewType}
                details={<CriteriaHelpText criteria="thoughtLeadership" isSelfReview={isSelfReview} />}
                prefix="thoughtLeadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Leadership')}
                type={reviewType}
                details={<CriteriaHelpText criteria="leadership" isSelfReview={isSelfReview} />}
                prefix="leadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Presence')}
                type={reviewType}
                details={<CriteriaHelpText criteria="presence" isSelfReview={isSelfReview} />}
                prefix="presence"
              />
            </Grid>
          </DictInput>
          <StickyBottomPaper>
            <ActionBar>
              <SubmitButton variant="contained" color="primary">
                {i18n._('Save')}
              </SubmitButton>
            </ActionBar>
          </StickyBottomPaper>
        </Grid>
      </Forminator>
    </ServerValueProvider>
  );
}
