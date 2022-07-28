import { Box, Typography } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { MultilineOutput, NumberedMultilineOutput } from 'src/shared/multiline-output';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { FCProps } from 'src/shared/types/FCProps';
import { isNotNil } from 'src/shared/utils/general.util';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
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
}

type Props = FCProps<OwnProps>;

export function ManagerReviewDominantCharacteristicsExpansionPanel(props: Props) {
  const { title, type } = props;

  const reviews = useFragment(fragment, props.reviews);

  const selfReview = reviews.find((review) => review.isSelfReview);
  const peerReviews = reviews.filter((review) => !review.isSelfReview).filter((review) => isNotNil(review[type]));

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h3">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box>
          {selfReview && selfReview[type] && (
            <ReviewItemInfo
              name={selfReview.reviewer ? getUserLabel(selfReview.reviewer) : undefined}
              src={selfReview.reviewer?.avatarUrl ?? undefined}
              type="self"
            >
              {selfReview[type]?.map((review, index) => (
                <Box key={index} marginBottom={1}>
                  <MultilineOutput enableTruncating value={review} />
                </Box>
              ))}
            </ReviewItemInfo>
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
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
