import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/expansion-panel';
import { Box, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { ResultCommentOutput } from 'src/pages/result-page/ResultCommentOutput';

interface OwnProps {
  title?: string;
  ownReviews: string[] | undefined;
  reviews: string[] | undefined;
}

type Props = FCProps<OwnProps>;

export function StrengthsWeaknessResultExpansionPanel(props: Props) {
  const { title, ownReviews, reviews } = props;

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h3">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {ownReviews?.map((review, index) => (
            <Box marginTop={2} key={index}>
              <ResultCommentOutput value={review} type="self" />
            </Box>
          ))}
          {reviews?.map((review, index) => (
            <Box marginTop={2} key={index}>
              <ResultCommentOutput value={review} type="peer" />
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
