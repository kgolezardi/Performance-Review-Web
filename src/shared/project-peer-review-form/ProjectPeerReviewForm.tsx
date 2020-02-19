import { i18n } from '@lingui/core';
import { Box, Grid, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useFragment } from 'react-relay/hooks';
import {
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  LimitedTextAreaInput,
  SubmitButton,
} from 'src/shared/forminator';
import { Rating } from 'src/shared/rating';
import { StickyActionBar } from 'src/shared/sticky-action-bar';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import {
  Evaluation,
  ProjectPeerReviewForm_projectComment$key,
} from './__generated__/ProjectPeerReviewForm_projectComment.graphql';

export interface ProjectCommentFormData {
  id: string;
  text: string;
  rating: Evaluation | null;
}

interface OwnProps {
  onSubmit: (data: ProjectCommentFormData) => void;
  projectComment: ProjectPeerReviewForm_projectComment$key;
}

type Props = FCProps<OwnProps> & StyleProps;

const fragment = graphql`
  fragment ProjectPeerReviewForm_projectComment on ProjectCommentNode {
    id
    text
    rating
  }
`;

export function ProjectPeerReviewForm(props: Props) {
  const { onSubmit } = props;
  const projectCommentObj = useFragment(fragment, props.projectComment);
  const projectComment = {
    text: projectCommentObj.text || '',
    rating: projectCommentObj.rating || null,
    id: projectCommentObj.id || '',
  };

  const [ref, inView] = useInView();
  const classes = useStyles(props);
  return (
    <div ref={ref} className={classes.wrapper}>
      <Box>
        <Forminator onSubmit={onSubmit} initialValue={projectComment}>
          <DictInput>
            <Grid container>
              <Grid item xs={12}>
                <DictInputItem field="rating">
                  <Box width={240} paddingBottom={4}>
                    <Rating inputLabel={i18n._('Evaluation')} type="peer" />
                  </Box>
                  <FragmentPrompt value={projectComment?.rating || null} />
                </DictInputItem>
              </Grid>
              <Grid item xs={12}>
                <DictInputItem field="text">
                  <LimitedTextAreaInput
                    label={i18n._('Your comment')}
                    variant="outlined"
                    maxChars={512}
                    fullWidth
                    helperText={i18n._('For instance, your personal key-results may be your accomplishments.')}
                  />
                  <FragmentPrompt value={projectComment?.text || ''} />
                </DictInputItem>
              </Grid>
              <StickyActionBar noSticky={!inView}>
                <Grid item className={classes.submitButtonGrid}>
                  <SubmitButton variant="contained" color="primary">
                    {i18n._('Save')}
                  </SubmitButton>
                </Grid>
              </StickyActionBar>
            </Grid>
          </DictInput>
        </Forminator>
      </Box>
    </div>
  );
}

const styles = (theme: Theme) => ({
  submitButtonGrid: {
    marginLeft: 'auto',
  } as CSSProperties,
  wrapper: {
    width: '100%',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ProjectPeerReviewItem' });
type StyleProps = Styles<typeof styles>;
