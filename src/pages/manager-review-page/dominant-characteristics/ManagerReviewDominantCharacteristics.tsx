import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewDominantCharacteristicsExpansionPanel } from './ManagerReviewDominantCharacteristicsExpansionPanel';
import { ManagerReviewDominantCharacteristicsQuery } from './__generated__/ManagerReviewDominantCharacteristicsQuery.graphql';

const query = graphql`
  query ManagerReviewDominantCharacteristicsQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...ManagerReviewDominantCharacteristicsExpansionPanel_reviews
        }
      }
    }
  }
`;

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

export default function ManagerReviewDominantCharacteristics(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ManagerReviewDominantCharacteristicsQuery>(query, { id: revieweeId });
  const reviews = data.viewer.user?.personReviews;

  if (!reviews) {
    return <Box padding={4}>no data</Box>;
  }

  return (
    <Box padding={4}>
      <ManagerReviewDominantCharacteristicsExpansionPanel
        reviews={reviews}
        title={i18n._('The most important characteristics or effective behaviors that he/she should maintain')}
        type="strengths"
      />
      <ManagerReviewDominantCharacteristicsExpansionPanel
        reviews={reviews}
        title={i18n._('The most important characteristics or behaviors he/she should improve')}
        type="weaknesses"
      />
    </Box>
  );
}
