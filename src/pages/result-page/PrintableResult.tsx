import graphql from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { PageBreak } from 'src/shared/page-break';
import { PrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { CriteriaResult } from './criteria-result-page/CriteriaResult';
import { PrintableResultQuery } from './__generated__/PrintableResultQuery.graphql';
import { ProjectResultExpansionPanel } from './project-result-page/ProjectResultExpansionPanel';
import { StrengthsWeaknessesResult } from './strengths-weaknesses-result-page/StrengthsWeaknessesResult';

interface OwnProps {
  revieweeId: string;
}

export type Props = FCProps<OwnProps>;

const query = graphql`
  query PrintableResultQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...CriteriaResult_reviews
          ...StrengthsWeaknessesResult_reviews
        }
        projectReviews {
          id
          ...ProjectResultExpansionPanel_projectReview
        }
      }
    }
  }
`;

export function PrintableResult(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<PrintableResultQuery>(query, { id: revieweeId });
  const reviews = data.viewer.user?.personReviews ?? [];
  const projectReviews = data.viewer.user?.projectReviews ?? [];

  useEffect(() => {
    window.print();
  }, []);

  return (
    <PrintingContext.Provider value={true}>
      <Box paddingY={2}>
        <CriteriaResult reviews={reviews} />
      </Box>
      <PageBreak />
      <Box paddingY={2}>
        <StrengthsWeaknessesResult reviews={reviews} />
      </Box>
      <PageBreak />
      <Box paddingY={2}>
        {projectReviews?.map((projectReview) => (
          <ProjectResultExpansionPanel projectReview={projectReview} key={projectReview.id} />
        ))}
      </Box>
    </PrintingContext.Provider>
  );
}
