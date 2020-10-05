import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { ReviewItemOutput } from 'src/shared/review-item-output';

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
              <ReviewItemOutput value={review} type="self" anonymous />
            </Box>
          ))}
          {reviews?.map((review, index) => (
            <Box marginTop={2} key={index}>
              <ReviewItemOutput value={review} type="peer" anonymous />
            </Box>
          ))}
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
