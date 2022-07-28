import { Box } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { PrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';
import { PageBreak } from 'src/shared/page-break';
import { FCProps } from 'src/shared/types/FCProps';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { ProjectResultExpansionPanel } from './project-result-page/ProjectResultExpansionPanel';
import { StrengthsWeaknessesResult } from './strengths-weaknesses-result-page/StrengthsWeaknessesResult';
import { ResultPrintPageQuery } from './__generated__/ResultPrintPageQuery.graphql';

interface OwnProps {}

export type Props = FCProps<OwnProps>;

const query = graphql`
  query ResultPrintPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...StrengthsWeaknessesResult_reviews
        }
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
  const reviews = data.viewer.user?.personReviews ?? [];
  const projectReviews = data.viewer.user?.projectReviews ?? [];

  useEffect(() => {
    setTimeout(() => {
      window.parent.postMessage({ action: 'print-result' }, '*');
    }, 5000);
  }, []);

  if (!data.viewer.user) {
    // TODO: handle this
    return <div>No user found</div>;
  }

  return (
    <PrintingContext.Provider value={true}>
      <Helmet>
        <title>{getUserLabel(data.viewer.user)}</title>
      </Helmet>
      <PageBreak />
      <Box paddingY={2}>
        {projectReviews?.map((projectReview) => (
          <ProjectResultExpansionPanel projectReview={projectReview} key={projectReview.id} />
        ))}
      </Box>
      <PageBreak />
      <Box paddingY={2}>
        <StrengthsWeaknessesResult reviews={reviews} />
      </Box>
    </PrintingContext.Provider>
  );
}
