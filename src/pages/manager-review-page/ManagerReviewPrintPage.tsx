import graphql from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { FormChangeDetector } from 'src/shared/form-change-detector';
import { FormChangePrompt } from 'src/shared/form-change-prompt';
import { Helmet } from 'react-helmet-async';
import { InView } from 'src/shared/in-view';
import { PageBreak } from 'src/shared/page-break';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { PrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useParams } from 'react-router-dom';

import ManagerReviewDominantCharacteristics from './dominant-characteristics/ManagerReviewDominantCharacteristics';
import ManagerReviewOverallEvaluation from './overall-evaluation';
import { ManagerReviewAchievements } from './achievements';
import { ManagerReviewPrintPageQuery } from './__generated__/ManagerReviewPrintPageQuery.graphql';

const query = graphql`
  query ManagerReviewPrintPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        ...PersonInfoCardHeader_user
        ...getUserLabel_user
      }
    }
  }
`;

interface Params {
  uid: string;
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function ManagerReviewPrintPage(props: Props) {
  const { uid } = useParams<Params>();
  const revieweeId = unescape(uid);

  const data = useLazyLoadQuery<ManagerReviewPrintPageQuery>(query, { id: revieweeId });

  useEffect(() => {
    if (data) {
      window.parent.postMessage({ action: 'print-manager-review' }, '*');
    }
  }, [data]);

  if (!data.viewer.user) {
    // TODO: handle this
    return <div>No user found</div>;
  }

  return (
    <FormChangeDetector>
      <FormChangePrompt message={i18n._('Changes you made may not be saved.')} />
      <Helmet>
        <title>{getUserLabel(data.viewer.user)}</title>
      </Helmet>
      <PrintingContext.Provider value={true}>
        <InView>
          <PersonInfoCardHeader user={data.viewer.user} />
          <Divider />
        </InView>
        <Box color="primary.main" marginTop={8} textAlign="center">
          <Typography variant="h2">{i18n._('Achievements')}</Typography>
        </Box>
        <ManagerReviewAchievements revieweeId={revieweeId} />
        <PageBreak />
        <Box color="primary.main" marginTop={8} textAlign="center">
          <Typography variant="h2">{i18n._('Dominant Characteristics')}</Typography>
        </Box>
        <ManagerReviewDominantCharacteristics revieweeId={revieweeId} />
        <PageBreak />
        <Box color="primary.main" marginTop={8} textAlign="center">
          <Typography variant="h2">{i18n._('Overall Evaluation')}</Typography>
        </Box>
        <ManagerReviewOverallEvaluation revieweeId={revieweeId} />
      </PrintingContext.Provider>
    </FormChangeDetector>
  );
}
