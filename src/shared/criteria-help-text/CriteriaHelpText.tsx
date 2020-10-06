import React, { useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { PerformanceCompetenciesPrefix } from 'src/global-types';
import { importMDX } from 'mdx.macro';

interface OwnProps {
  isSelfReview: boolean;
  criteria: PerformanceCompetenciesPrefix;
}

// self review helper texts
const OrganizationCultureAdoptionContentSelfReview = importMDX.sync(
  './help-texts/self-review/OrganizationCultureAdoptionContent.mdx',
);
const ProblemSolvingContentSelfReview = importMDX.sync('./help-texts/self-review/ProblemSolvingContent.mdx');
const ExecutionContentSelfReview = importMDX.sync('./help-texts/self-review/ExecutionContent.mdx');
const LeadershipContentSelfReview = importMDX.sync('./help-texts/self-review/LeadershipContent.mdx');
const ThoughtLeadershipContentSelfReview = importMDX.sync('./help-texts/self-review/ThoughtLeadershipContent.mdx');
const PresenceContentSelfReview = importMDX.sync('./help-texts/self-review/PresenceContent.mdx');

// peer review helper texts
const OrganizationCultureAdoptionContentPeerReview = importMDX.sync(
  './help-texts/peer-review/OrganizationCultureAdoptionContent.mdx',
);
const ProblemSolvingContentPeerReview = importMDX.sync('./help-texts/peer-review/ProblemSolvingContent.mdx');
const ExecutionContentPeerReview = importMDX.sync('./help-texts/peer-review/ExecutionContent.mdx');
const LeadershipContentPeerReview = importMDX.sync('./help-texts/peer-review/LeadershipContent.mdx');
const ThoughtLeadershipContentPeerReview = importMDX.sync('./help-texts/peer-review/ThoughtLeadershipContent.mdx');
const PresenceContentPeerReview = importMDX.sync('./help-texts/peer-review/PresenceContent.mdx');

export type Props = FCProps<OwnProps>;

export function CriteriaHelpText(props: Props) {
  const { criteria, isSelfReview } = props;
  const components = useContext(MDXContext);

  if (criteria === 'sahabiness') {
    return isSelfReview ? (
      <OrganizationCultureAdoptionContentSelfReview components={components} />
    ) : (
      <OrganizationCultureAdoptionContentPeerReview components={components} />
    );
  }

  if (criteria === 'problemSolving') {
    return isSelfReview ? (
      <ProblemSolvingContentSelfReview components={components} />
    ) : (
      <ProblemSolvingContentPeerReview components={components} />
    );
  }

  if (criteria === 'execution') {
    return isSelfReview ? (
      <ExecutionContentSelfReview components={components} />
    ) : (
      <ExecutionContentPeerReview components={components} />
    );
  }

  if (criteria === 'thoughtLeadership') {
    return isSelfReview ? (
      <ThoughtLeadershipContentSelfReview components={components} />
    ) : (
      <ThoughtLeadershipContentPeerReview components={components} />
    );
  }

  if (criteria === 'leadership') {
    return isSelfReview ? (
      <LeadershipContentSelfReview components={components} />
    ) : (
      <LeadershipContentPeerReview components={components} />
    );
  }

  if (criteria === 'presence') {
    return isSelfReview ? (
      <PresenceContentSelfReview components={components} />
    ) : (
      <PresenceContentPeerReview components={components} />
    );
  }
  return null;
}
