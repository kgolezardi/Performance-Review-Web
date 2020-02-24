import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { MultilineOutput } from 'src/shared/multiline-output';
import { OutputBorder } from 'src/shared/output-border';
import { FCProps } from 'src/shared/types/FCProps';
import { ProjectManagerReview_review$key } from './__generated__/ProjectManagerReview_review.graphql';

interface OwnProps {
  review: ProjectManagerReview_review$key;
}

type Props = FCProps<OwnProps>;

export function ProjectManagerReview(props: Props) {
  const review = useFragment(fragment, props.review);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h6">{review.project.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom>{i18n._('Performance to initial expectation')}:</Typography>
            <Box width={240}>
              <OutputBorder>
                <EvaluationOutput value={review.rating as Evaluation} type="self" />
              </OutputBorder>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>{i18n._('Accomplishments')}:</Typography>
            <OutputBorder>
              <MultilineOutput value={review.text} />
            </OutputBorder>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const fragment = graphql`
  fragment ProjectManagerReview_review on ProjectReviewNode {
    project {
      name
    }
    text
    rating
  }
`;
