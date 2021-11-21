import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { GuidesContext } from './GuidesContext';
import { GuidesProviderQuery } from './__generated__/GuidesProviderQuery.graphql';

const query = graphql`
  query GuidesProviderQuery {
    viewer {
      settings {
        selfReviewSahabinessHelpModalText
        selfReviewProblemSolvingHelpModalText
        selfReviewExecutionHelpModalText
        selfReviewThoughtLeadershipHelpModalText
        selfReviewLeadershipHelpModalText
        selfReviewPresenceHelpModalText
        selfReviewProjectReviewHelpModalText
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function GuidesProvider(props: Props) {
  const data = useLazyLoadQuery<GuidesProviderQuery>(query, {});
  const {
    settings: {
      selfReviewSahabinessHelpModalText,
      selfReviewProblemSolvingHelpModalText,
      selfReviewExecutionHelpModalText,
      selfReviewThoughtLeadershipHelpModalText,
      selfReviewLeadershipHelpModalText,
      selfReviewPresenceHelpModalText,
      selfReviewProjectReviewHelpModalText,
    },
  } = data.viewer;
  const value = useMemo(
    () => ({
      selfReviewSahabinessHelpModalText,
      selfReviewProblemSolvingHelpModalText,
      selfReviewExecutionHelpModalText,
      selfReviewThoughtLeadershipHelpModalText,
      selfReviewLeadershipHelpModalText,
      selfReviewPresenceHelpModalText,
      selfReviewProjectReviewHelpModalText,
    }),
    [
      selfReviewSahabinessHelpModalText,
      selfReviewProblemSolvingHelpModalText,
      selfReviewExecutionHelpModalText,
      selfReviewThoughtLeadershipHelpModalText,
      selfReviewLeadershipHelpModalText,
      selfReviewPresenceHelpModalText,
      selfReviewProjectReviewHelpModalText,
    ],
  );
  return <GuidesContext.Provider value={value}>{props.children}</GuidesContext.Provider>;
}
