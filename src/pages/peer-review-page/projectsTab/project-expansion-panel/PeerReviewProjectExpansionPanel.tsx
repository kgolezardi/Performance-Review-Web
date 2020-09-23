import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/expansion-panel';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid, Theme, Typography, makeStyles } from '@material-ui/core';
import { ProjectOutput } from 'src/shared/project-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFragment } from 'react-relay/hooks';

import { PeerReviewProjectExpansionPanel_projectReview$key } from './__generated__/PeerReviewProjectExpansionPanel_projectReview.graphql';
import { PeerReviewProjectsForm, PeerReviewProjectsFormValue } from '../projects-form/PeerReviewProjectsForm';
import { useSaveProjectComment } from './saveProjectComment.mutation';

const fragment = graphql`
  fragment PeerReviewProjectExpansionPanel_projectReview on ProjectReviewNode {
    id
    reviewee {
      ...getUserLabel_user
    }
    project {
      name
    }
    ...ProjectOutput_review
    comment {
      ...PeerReviewProjectsForm_projectComment
    }
  }
`;

interface OwnProps {
  projectReview: PeerReviewProjectExpansionPanel_projectReview$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function PeerReviewProjectExpansionPanel(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);
  const saveProjectComment = useSaveProjectComment();
  const projectReviewId = projectReview.id;
  const { enqueueSnackbar } = useBiDiSnackbar();

  const handleSubmit = useCallback(
    (input: PeerReviewProjectsFormValue) => {
      saveProjectComment({ input: { ...input, projectReviewId } })
        .then((res) => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch((error) => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [saveProjectComment, projectReviewId, enqueueSnackbar],
  );

  const projectName = projectReview.project.name;
  const name = getUserLabel(projectReview.reviewee);

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h5">{projectName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("{name}'s comment about his/her performance compared to initial expectation", { name })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <QuoteBox>
              <ProjectOutput review={projectReview} />
            </QuoteBox>
          </Grid>
          {projectReview.comment && (
            <>
              <Grid item xs={12}>
                <Typography variant="button" className={classes.detailTypography}>
                  {i18n._("Your comment about {name}'s performance in this project", { name })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <PeerReviewProjectsForm onSubmit={handleSubmit} projectComment={projectReview.comment} />
              </Grid>
            </>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

const styles = (theme: Theme) => ({
  detailTypography: {
    color: theme.palette.grey[700],
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PeerReviewProjectExpansionPanel' });
type StyleProps = Styles<typeof styles>;
