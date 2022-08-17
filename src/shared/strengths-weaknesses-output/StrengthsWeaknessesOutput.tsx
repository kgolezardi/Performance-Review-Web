import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { useFragment } from 'react-relay/hooks';

import { MultilineOutput, NumberedMultilineOutput } from '../multiline-output';
import { ReviewItemInfo } from '../review-item-info';
import { StrengthsWeaknessesOutput_reviews$key } from './__generated__/StrengthsWeaknessesOutput_reviews.graphql';
import { getUserLabel } from '../utils/getUserLabel';
import { isNotNil } from '../utils/general.util';
import { usePrintingContext } from '../layouts/dashboard-layouts/PrintingContext';

const fragment = graphql`
  fragment StrengthsWeaknessesOutput_reviews on UserNode {
    personReviews {
      isSelfReview
      strengths
      weaknesses
      reviewer {
        avatarUrl
        ...getUserLabel_user
      }
    }
    managerPersonReview {
      strengths
      weaknesses
    }
    manager {
      ...getUserLabel_user
      avatarUrl
    }
  }
`;

interface OwnProps {
  reviews: StrengthsWeaknessesOutput_reviews$key;
  type: 'strengths' | 'weaknesses';
  anonymous?: boolean;
  showMangerPersonReviewOnlyInPrint?: boolean;
}

type Props = React.PropsWithChildren<OwnProps>;

export function StrengthsWeaknessesOutput(props: Props) {
  const { type, anonymous = false, showMangerPersonReviewOnlyInPrint = false } = props;

  const { personReviews, managerPersonReview, manager } = useFragment(fragment, props.reviews);
  const printing = usePrintingContext();

  const selfReview = personReviews.find((review) => review.isSelfReview);
  const peerReviews = personReviews
    .filter((review) => !review.isSelfReview)
    .filter((review) => isNotNil(review[type]))
    .filter((review) => !!review[type]?.length);

  const showMangerPersonReview = !showMangerPersonReviewOnlyInPrint || printing;

  return (
    <div>
      {selfReview && selfReview[type] && (
        <ReviewItemInfo
          name={selfReview.reviewer ? getUserLabel(selfReview.reviewer) : undefined}
          src={selfReview.reviewer?.avatarUrl ?? undefined}
          type="self"
          anonymous={anonymous}
        >
          {selfReview[type]?.length ? (
            selfReview[type]?.map((review, index) => (
              <Box key={index} marginBottom={1}>
                <MultilineOutput value={review} />
              </Box>
            ))
          ) : (
            <MultilineOutput value={null} />
          )}
        </ReviewItemInfo>
      )}
      {showMangerPersonReview && manager && managerPersonReview && (
        <Box marginTop={2}>
          <ReviewItemInfo name={getUserLabel(manager) ?? undefined} src={manager.avatarUrl ?? undefined} type="manager">
            {managerPersonReview[type]?.map((review, index) => (
              <Box key={index} marginBottom={1}>
                <NumberedMultilineOutput enableTruncating index={index} value={review} />
              </Box>
            ))}
          </ReviewItemInfo>
        </Box>
      )}
      {peerReviews?.map((review, index) => (
        <Box marginTop={2} key={index}>
          <ReviewItemInfo
            name={review.reviewer ? getUserLabel(review.reviewer) : undefined}
            src={review.reviewer?.avatarUrl ?? undefined}
            type="peer"
            anonymous={anonymous}
          >
            {review[type]?.map((review, index) => (
              <Box key={index} marginBottom={1}>
                <NumberedMultilineOutput index={index} value={review} />
              </Box>
            ))}
          </ReviewItemInfo>
        </Box>
      ))}
    </div>
  );
}
