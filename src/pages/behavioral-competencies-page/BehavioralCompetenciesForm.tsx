import ReactMarkdown from 'react-markdown';
import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { ActionBar } from 'src/shared/action-bar';
import { BehavioralCompetencyHelpText } from 'src/shared/behavioral-competency-help-text';
import { BehavioralCompetencyItem } from 'src/shared/behavioral-competency-item';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid } from '@material-ui/core';
import { Guide } from 'src/shared/guide/Guide';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { ServerValueProvider } from 'src/shared/server-value';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { defaultRenderers } from 'src/shared/react-markdown';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';
import { useGuidesContext } from 'src/core/guides';

import { BehavioralCompetenciesFormValue } from './BehavioralCompetenciesFormValue';
import { BehavioralCompetenciesForm_review$key } from './__generated__/BehavioralCompetenciesForm_review.graphql';

// self review helper texts
const DescriptionContentSelfReview = importMDX.sync('./help-texts/self-review/DescriptionContent.mdx');

// peer review helper texts
const DescriptionContentPeerReview = importMDX.sync('./help-texts/peer-review/DescriptionContent.mdx');

const fragment = graphql`
  fragment BehavioralCompetenciesForm_review on PersonReviewNode {
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
  review: BehavioralCompetenciesForm_review$key | null;
  isSelfReview: boolean;
  onSubmit: (data: BehavioralCompetenciesFormValue) => void;
}

type Props = FCProps<OwnProps>;

export function BehavioralCompetenciesForm(props: Props) {
  const { onSubmit, isSelfReview } = props;
  const components = useContext(MDXContext);
  const review = useFragment(fragment, props.review);
  const reviewType = isSelfReview ? 'self' : 'peer';
  const {
    selfReviewExecutionHelpModalText,
    selfReviewSahabinessHelpModalText,
    selfReviewLeadershipHelpModalText,
    selfReviewPresenceHelpModalText,
    selfReviewProblemSolvingHelpModalText,
    selfReviewThoughtLeadershipHelpModalText,
  } = useGuidesContext();
  // if review properties are null, replace it with undefined
  let value: BehavioralCompetenciesFormValue = {};
  for (const key in review) {
    Object.assign(value, { [key]: review?.[key as keyof BehavioralCompetenciesFormValue] ?? undefined });
  }

  const dirty = useFormDirty();

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
              <BehavioralCompetencyItem
                title={i18n._('Organization Culture Adoption')}
                type={reviewType}
                details={<BehavioralCompetencyHelpText criteria="sahabiness" isSelfReview={isSelfReview} />}
                prefix="sahabiness"
              />
              {selfReviewSahabinessHelpModalText ? (
                <Guide
                  title={i18n._('Organization Culture Adoption')}
                  guideText={
                    <ReactMarkdown renderers={defaultRenderers}>{selfReviewSahabinessHelpModalText}</ReactMarkdown>
                  }
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <BehavioralCompetencyItem
                title={i18n._('Problem Solving')}
                type={reviewType}
                details={<BehavioralCompetencyHelpText criteria="problemSolving" isSelfReview={isSelfReview} />}
                prefix="problemSolving"
              />
              {selfReviewProblemSolvingHelpModalText ? (
                <Guide
                  title={i18n._('Problem Solving')}
                  guideText={
                    <ReactMarkdown renderers={defaultRenderers}>{selfReviewProblemSolvingHelpModalText}</ReactMarkdown>
                  }
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <BehavioralCompetencyItem
                title={i18n._('Output Quality')}
                type={reviewType}
                details={<BehavioralCompetencyHelpText criteria="execution" isSelfReview={isSelfReview} />}
                prefix="execution"
              />
              {selfReviewExecutionHelpModalText ? (
                <Guide
                  title={i18n._('Output Quality')}
                  guideText={
                    <ReactMarkdown renderers={defaultRenderers}>{selfReviewExecutionHelpModalText}</ReactMarkdown>
                  }
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <BehavioralCompetencyItem
                title={i18n._('Thought Leadership')}
                type={reviewType}
                details={<BehavioralCompetencyHelpText criteria="thoughtLeadership" isSelfReview={isSelfReview} />}
                prefix="thoughtLeadership"
              />
              {selfReviewThoughtLeadershipHelpModalText ? (
                <Guide
                  title={i18n._('Thought Leadership')}
                  guideText={
                    <ReactMarkdown renderers={defaultRenderers}>
                      {selfReviewThoughtLeadershipHelpModalText}
                    </ReactMarkdown>
                  }
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <BehavioralCompetencyItem
                title={i18n._('Leadership')}
                type={reviewType}
                details={<BehavioralCompetencyHelpText criteria="leadership" isSelfReview={isSelfReview} />}
                prefix="leadership"
              />
              {selfReviewLeadershipHelpModalText ? (
                <Guide
                  title={i18n._('Leadership')}
                  guideText={
                    <ReactMarkdown renderers={defaultRenderers}>{selfReviewLeadershipHelpModalText}</ReactMarkdown>
                  }
                />
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <BehavioralCompetencyItem
                title={i18n._('Presence')}
                type={reviewType}
                details={<BehavioralCompetencyHelpText criteria="presence" isSelfReview={isSelfReview} />}
                prefix="presence"
              />
              {selfReviewPresenceHelpModalText ? (
                <Guide
                  title={i18n._('Presence')}
                  guideText={
                    <ReactMarkdown renderers={defaultRenderers}>{selfReviewPresenceHelpModalText}</ReactMarkdown>
                  }
                />
              ) : null}
            </Grid>
          </DictInput>
          <StickyBottomPaper>
            <ActionBar>
              <SubmitButton variant="contained" color="primary" disabled={!dirty}>
                {i18n._('Save')}
              </SubmitButton>
            </ActionBar>
          </StickyBottomPaper>
        </Grid>
      </Forminator>
    </ServerValueProvider>
  );
}
