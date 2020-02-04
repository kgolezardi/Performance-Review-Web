import { i18n } from '@lingui/core';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Evaluation } from 'src/global-types';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { EvaluationOutput } from 'src/shared/evaluationt-output';
import { MultilineOutput } from 'src/shared/multiline-output';
import { OutputBorder } from 'src/shared/output-border';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ProjectManagerReview_review$key } from './__generated__/ProjectManagerReview_review.graphql';

interface OwnProps {
  review: ProjectManagerReview_review$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ProjectManagerReview(props: Props) {
  const review = useFragment(fragment, props.review);
  const classes = useStyles(props);

  return (
    <ExpansionPanel
      classes={{ root: classes.expansionPanelRoot, expanded: classes.expansionPanelExpanded }}
      defaultExpanded={true}
      elevation={0}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{review.project.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom>{i18n._('Performance to initial expectation')}:</Typography>
            <Box width={240}>
              <OutputBorder>
                {review.rating ? (
                  <EvaluationOutput value={review.rating as Evaluation} />
                ) : (
                  <Typography variant="body1">{NON_BREAKING_SPACE}</Typography>
                )}
              </OutputBorder>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>{i18n._('Accomplishments')}:</Typography>
            <OutputBorder>
              <MultilineOutput value={review.text || NON_BREAKING_SPACE} />
            </OutputBorder>
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const styles = (theme: Theme) => ({
  expansionPanelRoot: {
    '&:first-child:before': {
      display: 'none',
    },
    '&:not(:first-child):before': {
      display: 'block !important',
      opacity: '100% !important',
    },
    '&$expansionPanelExpanded': {
      margin: 0,
    },
  } as CSSProperties,
  expansionPanelExpanded: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ProjectManagerReview' });
type StyleProps = Styles<typeof styles>;

const fragment = graphql`
  fragment ProjectManagerReview_review on ProjectReviewNode {
    project {
      name
    }
    text
    rating
  }
`;

export type ProjectManagerReviewProps = Props;
