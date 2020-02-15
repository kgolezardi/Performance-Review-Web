import { i18n } from '@lingui/core';
import { Box, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import { equals, identity, prop, sortBy } from 'ramda';
import React, { useCallback, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useFragment } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { DeleteProjectReviewMutationInput } from 'src/pages/projects-page/__generated__/deleteProjectReviewMutation.graphql';
import { ConfirmButton } from 'src/shared/confirm-button';
import { DangerButton } from 'src/shared/danger-button';
import {
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  LimitedTextAreaInput,
  SubmitButton,
} from 'src/shared/forminator';
import { Rating } from 'src/shared/rating';
import { ReviewersInput } from 'src/shared/reviewers-input';
import { ReviewersInputProps } from 'src/shared/reviewers-input/types';
import { StickyActionBar } from 'src/shared/sticky-action-bar';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ProjectForm_projectReview$key } from './__generated__/ProjectForm_projectReview.graphql';
import { Evaluation } from './__generated__/saveProjectReviewMutation.graphql';

export interface ProjectFormData {
  projectId: string;
  text?: string;
  rating?: Evaluation;
  reviewersId: string[];
}
interface OwnProps {
  onSubmit: (data: ProjectFormData) => void;
  onDelete: (input: DeleteProjectReviewMutationInput) => void;
  projectReview: ProjectForm_projectReview$key;
  users: ReviewersInputProps['users'];
}

type Props = FCProps<OwnProps> & StyleProps;

const arrayEqual = (v1: string[] | undefined, v2: string[] | undefined) => {
  return equals(sortBy(identity, v1 || []), sortBy(identity, v2 || []));
};

export function ProjectForm(props: Props) {
  const { onSubmit, onDelete } = props;
  const projectReview = useFragment(
    graphql`
      fragment ProjectForm_projectReview on ProjectReviewNode {
        project {
          id
          name
        }
        text
        id
        rating
        reviewers {
          id
        }
      }
    `,
    props.projectReview,
  );

  const initialValue: ProjectFormData = useMemo(() => {
    return {
      projectId: projectReview.project.id,
      text: projectReview.text || '',
      rating: projectReview.rating || undefined,
      reviewersId: projectReview.reviewers.map(prop('id')),
    };
  }, [projectReview]);

  const user = useAuthGuardUser();
  const userIds = useMemo(() => [user.id], [user]);

  const handleDelete = useCallback(() => {
    onDelete({ projectReviewId: projectReview.id });
  }, [onDelete, projectReview]);

  const [ref, inView] = useInView();
  const classes = useStyles(props);

  return (
    <div ref={ref} className={classes.wrapper}>
      <Forminator onSubmit={onSubmit} initialValue={initialValue}>
        <Grid container spacing={2}>
          <DictInput>
            <DictInputItem field="projectId">
              <ConstantInput />
            </DictInputItem>

            <Grid item xs={12}>
              <Typography>{i18n._('How effective were you in this project?')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <DictInputItem field="rating">
                <Box width={240}>
                  <Rating inputLabel={i18n._('My impact')} type="self" />
                  <FragmentPrompt value={initialValue.rating || null} />
                </Box>
              </DictInputItem>
            </Grid>
            <Grid item xs={12}>
              <DictInputItem field="text">
                <LimitedTextAreaInput
                  label={i18n._('Accomplishments')}
                  maxChars={512}
                  variant="outlined"
                  fullWidth
                  helperText={i18n._('For instance, your personal key-results may be your accomplishments.')}
                />
                <FragmentPrompt value={initialValue.text || ''} />
              </DictInputItem>
            </Grid>
            <Grid item xs={12}>
              <DictInputItem field="reviewersId">
                <ReviewersInput
                  label={i18n._('Reviewers')}
                  users={props.users}
                  excludes={userIds}
                  helperText={i18n._(
                    'People who will comment on your accomplishments and write your performance competencies and dominant characteristics from their own point of view.',
                  )}
                />
                <FragmentPrompt value={initialValue.reviewersId || []} equal={arrayEqual} />
              </DictInputItem>
            </Grid>
          </DictInput>
          <StickyActionBar noSticky={!inView}>
            <ConfirmButton
              buttonText={i18n._('Delete')}
              onConfirm={handleDelete}
              text={i18n._('Are you sure you want to delete this project review?')}
              ConfirmComponent={DangerButton}
              confirmProps={{ variant: 'contained' }}
            />
            <SubmitButton variant="contained" color="primary">
              {i18n._('Save')}
            </SubmitButton>
          </StickyActionBar>
        </Grid>
      </Forminator>
    </div>
  );
}

const styles = (theme: Theme) => ({
  wrapper: {
    width: '100%',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ProjectForm' });
type StyleProps = Styles<typeof styles>;
