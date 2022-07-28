import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { MultilineOutput } from 'src/shared/multiline-output';
import { ReviewItemInfo } from 'src/shared/review-item-info';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  title?: string;
  ownReviews: string[] | undefined;
  reviews: string[] | undefined;
}

type Props = FCProps<OwnProps>;

export function StrengthsWeaknessResultExpansionPanel(props: Props) {
  const { title, ownReviews, reviews } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h3">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box>
          {ownReviews?.map((review, index) => (
            <Box marginTop={2} key={index}>
              <ReviewItemInfo anonymous type="self">
                <MultilineOutput enableTruncating value={review} />
              </ReviewItemInfo>
            </Box>
          ))}
          {reviews?.map((review, index) => (
            <Box marginTop={2} key={index}>
              <ReviewItemInfo anonymous type="peer">
                <MultilineOutput enableTruncating value={review} />
              </ReviewItemInfo>
            </Box>
          ))}
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
