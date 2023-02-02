import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Typography } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { OverallRatingOutputQuery } from './__generated__/OverallRatingOutputQuery.graphql';

const query = graphql`
  query OverallRatingOutputQuery($id: ID!) {
    viewer {
      user(id: $id) {
        managerPersonReview {
          overallRating
        }
      }
    }
  }
`;

interface OwnProps {
  revieweeId: string;
}

type Props = React.PropsWithChildren<OwnProps>;

export function OverallRatingOutput(props: Props) {
  const data = useLazyLoadQuery<OverallRatingOutputQuery>(query, { id: props.revieweeId });

  return (
    <QuoteBox border="1px solid #00800033" textAlign="center" color="green" mb={2} bgcolor="success.light">
      <Typography variant="h6">{`${i18n._("Manager's Overall Evaluation of Your Performance")}:`}</Typography>
      <EvaluationOutput type="peer" value={data.viewer.user?.managerPersonReview?.overallRating} />
    </QuoteBox>
  );
}
