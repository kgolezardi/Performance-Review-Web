import { i18n } from '@lingui/core';
import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { MultilineOutput } from 'src/shared/multiline-output';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ProjectPeerReviewOutput_projectReview$key } from './__generated__/ProjectPeerReviewOutput_projectReview.graphql';

interface OwnProps {
  projectReview: ProjectPeerReviewOutput_projectReview$key;
}

const fragment = graphql`
  fragment ProjectPeerReviewOutput_projectReview on ProjectReviewNode {
    rating
    text
  }
`;

type Props = FCProps<OwnProps> & StyleProps;

export function ProjectPeerReviewOutput(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom>
            {i18n._('Evaluation')}
          </Typography>
          <EvaluationOutput value={projectReview.rating as Evaluation} type="self" className={classes.mainTypography} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom>
            {i18n._('Accomplishments')}:
          </Typography>
          <MultilineOutput value={projectReview.text} className={classes.mainTypography} />
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: 4,
    padding: theme.spacing(2, 1.5),
    width: '100%',
  } as CSSProperties,
  mainTypography: {
    color: theme.palette.grey[900],
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ProjectPeerReviewOutput' });
type StyleProps = Styles<typeof styles>;
