import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import ResetInputOnSubmit from 'src/shared/forminator/utils/ResetInputOnSubmit';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  ConditionalSection,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentRef,
  StringInput,
  SubmitButton,
} from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useFragmentLens } from 'src/shared/forminator/core/fragment-lens/useFragmentLens';

const maximumProjects = 5;
export interface AddProjectFormData {
  projectName: string | null;
}
interface OwnProps {
  onSubmit: (data: AddProjectFormData) => void;
  canAddNewProject: boolean;
}

type Props = FCProps<OwnProps>;

export function AddProjectForm(props: Props) {
  const { onSubmit, canAddNewProject } = props;
  const lens = useFragmentLens<string>();

  return (
    <Forminator onSubmit={onSubmit}>
      <DictInput>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{i18n._('Projects')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {i18n._('Choose projects you have been working on in the past year (At most {num}).', {
                num: maximumProjects,
              })}
            </Typography>
          </Grid>
          <Grid container item spacing={2} alignItems="center" xs={12}>
            <Grid item>
              <DictInputItem field="projectName">
                <Box width={320}>
                  <StringInput
                    disabled={!canAddNewProject}
                    variant="outlined"
                    label={i18n._('Project title')}
                    fullWidth
                  />
                  <FragmentRef lens={lens} />
                </Box>
              </DictInputItem>
            </Grid>
            <Grid item>
              <ResetInputOnSubmit resetValue={''} lens={lens}>
                <ConditionalSection lens={lens} condition={(value) => !value?.length}>
                  <SubmitButton disabled variant="outlined" color="primary" startIcon={<AddIcon />}>
                    {i18n._('Add')}
                  </SubmitButton>
                </ConditionalSection>
                <ConditionalSection lens={lens} condition={(value) => value?.length > 0}>
                  <SubmitButton disabled={!canAddNewProject} variant="outlined" color="primary" startIcon={<AddIcon />}>
                    {i18n._('Add')}
                  </SubmitButton>
                </ConditionalSection>
              </ResetInputOnSubmit>
            </Grid>
          </Grid>
        </Grid>
      </DictInput>
    </Forminator>
  );
}
