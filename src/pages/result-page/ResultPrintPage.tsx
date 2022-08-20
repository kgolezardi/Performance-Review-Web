import graphql from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Helmet } from 'react-helmet-async';
import { PageBreak } from 'src/shared/page-break';
import { PrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useAuthGuardUser } from 'src/core/auth';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ProjectResultExpansionPanel } from './project-result-page/ProjectResultExpansionPanel';
import { ResultPrintPageQuery } from './__generated__/ResultPrintPageQuery.graphql';
import { StrengthsWeaknessesResult } from './strengths-weaknesses-result-page/StrengthsWeaknessesResult';

interface OwnProps {}

export type Props = FCProps<OwnProps>;

const query = graphql`
  query ResultPrintPageQuery($id: ID!) {
    viewer {
      activeRound {
        reviewersAreAnonymous
      }
      user(id: $id) {
        ...StrengthsWeaknessesOutput_user
        projectReviews {
          id
          ...ProjectResultExpansionPanel_projectReview
        }
        ...getUserLabel_user
      }
    }
  }
`;

export function ResultPrintPage(props: Props) {
  const { id } = useAuthGuardUser();

  const data = useLazyLoadQuery<ResultPrintPageQuery>(query, { id });
  const projectReviews = data.viewer.user?.projectReviews ?? [];

  useEffect(() => {
    if (data) {
      window.parent.postMessage({ action: 'print-result' }, '*');
    }
  }, [data]);

  const reviewersAreAnonymous = data.viewer.activeRound.reviewersAreAnonymous;
  const reviewee = data.viewer.user;

  if (!reviewee) {
    // TODO: handle this
    return <div>No user found</div>;
  }

  return (
    <PrintingContext.Provider value={true}>
      <Helmet>
        <title>{getUserLabel(reviewee)}</title>
      </Helmet>
      <PageBreak />
      <Box paddingY={2}>
        {projectReviews?.map((projectReview) => (
          <ProjectResultExpansionPanel
            reviewersAreAnonymous={reviewersAreAnonymous}
            projectReview={projectReview}
            key={projectReview.id}
          />
        ))}
      </Box>
      <PageBreak />
      <Box paddingY={2}>
        <StrengthsWeaknessesResult reviewersAreAnonymous={reviewersAreAnonymous} reviewee={reviewee} />
      </Box>
    </PrintingContext.Provider>
  );
}
