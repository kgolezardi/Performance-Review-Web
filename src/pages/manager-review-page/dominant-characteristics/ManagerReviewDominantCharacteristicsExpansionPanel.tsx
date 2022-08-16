import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput, NumberedMultilineOutput } from 'src/shared/multiline-output';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useAuthGuardUser } from 'src/core/auth';
import { useFragment } from 'react-relay/hooks';
import { usePrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';

import { ManagerReviewDominantCharacteristicsExpansionPanel_reviews$key } from './__generated__/ManagerReviewDominantCharacteristicsExpansionPanel_reviews.graphql';

const fragment = graphql`
  fragment ManagerReviewDominantCharacteristicsExpansionPanel_reviews on PersonReviewNode @relay(plural: true) {
    isSelfReview
    strengths
    weaknesses
    reviewer {
      avatarUrl
      ...getUserLabel_user
    }
  }
`;

interface OwnProps {
  reviews: ManagerReviewDominantCharacteristicsExpansionPanel_reviews$key;
  title?: string;
  type: 'strengths' | 'weaknesses';
  managerPersonReview: {
    readonly strengths: ReadonlyArray<string> | null;
    readonly weaknesses: ReadonlyArray<string> | null;
  } | null;
}

type Props = FCProps<OwnProps>;

export function ManagerReviewDominantCharacteristicsExpansionPanel(props: Props) {
  const { title, type } = props;

  const reviews = useFragment(fragment, props.reviews);
  const isPrinting = usePrintingContext();
  const me = useAuthGuardUser();

  const selfReview = reviews.find((review) => review.isSelfReview);
  const peerReviews = reviews.filter((review) => !review.isSelfReview).filter((review) => !!review[type]?.length);
  const managerReview = props.managerPersonReview;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h3">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box width={1}>
          {selfReview && selfReview[type] && (
            <ReviewItemInfo
              name={selfReview.reviewer ? getUserLabel(selfReview.reviewer) : undefined}
              src={selfReview.reviewer?.avatarUrl ?? undefined}
              type="self"
            >
              {selfReview[type]?.length ? (
                selfReview[type]?.map((review, index) => (
                  <Box key={index} marginBottom={1}>
                    <MultilineOutput enableTruncating value={review} />
                  </Box>
                ))
              ) : (
                <MultilineOutput value={null} />
              )}
            </ReviewItemInfo>
          )}
          {isPrinting && managerReview && (
            <Box marginTop={2}>
              <ReviewItemInfo name={getUserLabel(me) ?? undefined} src={me.avatarUrl ?? undefined} type="manager">
                {managerReview[type]?.map((review, index) => (
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
              >
                {review[type]?.map((review, index) => (
                  <Box key={index} marginBottom={1}>
                    <NumberedMultilineOutput enableTruncating index={index} value={review} />
                  </Box>
                ))}
              </ReviewItemInfo>
            </Box>
          ))}
          {props.children}
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
