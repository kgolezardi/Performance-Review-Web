import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box } from '@material-ui/core';
import { useFragment } from 'react-relay/hooks';

import { MultilineOutput, NumberedMultilineOutput } from '../multiline-output';
import { ReviewItemInfo } from '../review-item-info';
import { StrengthsWeaknessesOutput_user$key } from './__generated__/StrengthsWeaknessesOutput_user.graphql';
import { getUserLabel } from '../utils/getUserLabel';
import { isNotNil } from '../utils/general.util';
import { usePrintingContext } from '../layouts/dashboard-layouts/PrintingContext';

const fragment = graphql`
  fragment StrengthsWeaknessesOutput_user on UserNode {
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
  reviewee: StrengthsWeaknessesOutput_user$key;
  type: 'strengths' | 'weaknesses';
  anonymous?: boolean;
  showMangerPersonReviewOnlyInPrint?: boolean;
}

type Props = React.PropsWithChildren<OwnProps>;

export function StrengthsWeaknessesOutput(props: Props) {
  const { type, anonymous = false, showMangerPersonReviewOnlyInPrint = false } = props;

  const { personReviews, managerPersonReview, manager } = useFragment(fragment, props.reviewee);
  const printing = usePrintingContext();

  const selfReview = personReviews.find((review) => review.isSelfReview);
  const peerReviews = personReviews
    .filter((review) => !review.isSelfReview)
    .filter((review) => isNotNil(review[type]))
    .filter((review) => !!review[type]?.length);

  const showMangerPersonReview = !showMangerPersonReviewOnlyInPrint || printing;
  const selfReviewType = selfReview?.[type] ?? [];
  const reviewer = selfReview?.reviewer;

  return (
    <div>
      {selfReviewType && (
        <ReviewItemInfo
          name={reviewer ? getUserLabel(reviewer) : undefined}
          src={reviewer?.avatarUrl ?? undefined}
          type="self"
          anonymous={anonymous}
        >
          {selfReviewType.length ? (
            selfReviewType.map((review, index) => (
              <Box key={index} marginBottom={1}>
                <NumberedMultilineOutput index={index} value={review} />
              </Box>
            ))
          ) : (
            <MultilineOutput value={null} />
          )}
        </ReviewItemInfo>
      )}
      {showMangerPersonReview && manager && managerPersonReview && (
        <ReviewItemInfo name={getUserLabel(manager) ?? undefined} src={manager.avatarUrl ?? undefined} type="manager">
          {managerPersonReview[type]?.length ? (
            managerPersonReview[type]?.map((review, index) => (
              <Box key={index} marginBottom={1}>
                <NumberedMultilineOutput index={index} value={review} />
              </Box>
            ))
          ) : (
            <MultilineOutput value={null} />
          )}
        </ReviewItemInfo>
      )}
      {peerReviews?.map((review, index) => (
        <ReviewItemInfo
          key={index}
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
      ))}
    </div>
  );
}
