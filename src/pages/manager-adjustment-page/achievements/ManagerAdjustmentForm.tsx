import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ActionBar } from 'src/shared/action-bar';
import {
  CheckboxInput,
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  SubmitButton,
} from 'src/shared/forminator';
import { Grid } from '@material-ui/core';
import { ReviewersInput } from 'src/shared/reviewers-input';
import { ReviewersInput_Reviewers$key } from 'src/shared/reviewers-input/__generated__/ReviewersInput_Reviewers.graphql';
import { arrayEqualSort } from 'src/shared/utils/arrayEqualSort';
import { i18n } from '@lingui/core';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';

import { ManageAdjustmentFormData } from './ManageAdjustmentFormData';
import { ManagerAdjustmentForm_data$key } from './__generated__/ManagerAdjustmentForm_data.graphql';

const fragment = graphql`
  fragment ManagerAdjustmentForm_data on ProjectReviewNode {
    id
    approvedByManager
    reviewers {
      id
    }
  }
`;
interface OwnProps {
  onSubmit: (formData: ManageAdjustmentFormData) => void;
  formData: ManagerAdjustmentForm_data$key;
  users: ReviewersInput_Reviewers$key;
  maximumReviewers: number;
  reviveeId: string;
  managerId: string;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ManagerAdjustmentForm(props: Props) {
  const { maximumReviewers, onSubmit, reviveeId, managerId } = props;

  const formData = useFragment(fragment, props.formData);
  const { approvedByManager, reviewers, id } = formData;

  const initialValue: ManageAdjustmentFormData = {
    reviewersId: reviewers.map((reviewer) => reviewer.id),
    approvedByManager,
    projectReviewId: id,
  };

  const dirty = useFormDirty();
  const excludes = [reviveeId, managerId];

  return (
    <Forminator onSubmit={onSubmit} initialValue={initialValue}>
      <Grid container item spacing={2}>
        <DictInput>
          <DictInputItem field="projectReviewId">
            <ConstantInput />
          </DictInputItem>
          <Grid item xs={12}>
            <DictInputItem field="reviewersId">
              <ReviewersInput
                initialValue={initialValue.reviewersId}
                label={i18n._('Reviewers (maximum {num})', { num: maximumReviewers })}
                users={props.users}
                excludes={excludes}
                helperText={i18n._('**Coordinate reviewers with manager', {
                  num: maximumReviewers,
                })}
                maximumReviewers={maximumReviewers}
              />
              <FragmentPrompt value={initialValue.reviewersId} equal={arrayEqualSort} />
            </DictInputItem>
          </Grid>
          <Grid item xs={12}>
            <DictInputItem field="approvedByManager">
              <CheckboxInput color="primary" label={i18n._('I approve')} />
              <FragmentPrompt value={initialValue.approvedByManager} />
            </DictInputItem>
          </Grid>
        </DictInput>
        <Grid item xs={12}>
          <ActionBar>
            <SubmitButton variant="contained" color="primary" disabled={!dirty}>
              {i18n._('Save')}
            </SubmitButton>
          </ActionBar>
        </Grid>
      </Grid>
    </Forminator>
  );
}
