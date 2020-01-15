import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import React, { useContext } from 'react';
import { CriterionItem } from 'src/shared/criterion-item';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { SectionGuide } from 'src/shared/section-guide';
import { ServerValueProvider } from 'src/shared/server-value';
import { StickyActionBar } from 'src/shared/sticky-action-bar/StickyActionBar';
import { FCProps } from 'src/shared/types/FCProps';
import { CriteriaFormData } from './CriteriaFormData';

const OrganizationCultureAdoptionContent = importMDX.sync('./OrganizationCultureAdoptionContent.mdx');
const ProblemSolvingContent = importMDX.sync('./ProblemSolvingContent.mdx');
const ExecutionContent = importMDX.sync('./ExecutionContent.mdx');
const LeadershipContent = importMDX.sync('./LeadershipContent.mdx');
const ThoughtLeadershipContent = importMDX.sync('./ThoughtLeadershipContent.mdx');
const PresenceContent = importMDX.sync('./PresenceContent.mdx');
const DescriptionContent = importMDX.sync('./DescriptionContent.mdx');

interface OwnProps {
  initialValue?: CriteriaFormData;
  onSubmit: (data: CriteriaFormData) => void;
}

type Props = FCProps<OwnProps>;

export function CriteriaForm(props: Props) {
  const { onSubmit } = props;
  const components = useContext(MDXContext);

  return (
    <ServerValueProvider value={props.initialValue}>
      <Forminator onSubmit={onSubmit} initialValue={props.initialValue}>
        <Grid container spacing={2}>
          <DictInput>
            <Grid item xs={12}>
              <SectionGuide>
                <DescriptionContent components={components} />
              </SectionGuide>
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Organization Culture Adoption')}
                details={<OrganizationCultureAdoptionContent components={components} />}
                prefix="sahabiness"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Problem Solving')}
                details={<ProblemSolvingContent components={components} />}
                prefix="problemSolving"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Execution')}
                details={<ExecutionContent components={components} />}
                prefix="execution"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Thought Leadership')}
                details={<ThoughtLeadershipContent components={components} />}
                prefix="thoughtLeadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Leadership')}
                details={<LeadershipContent components={components} />}
                prefix="leadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Presence')}
                details={<PresenceContent components={components} />}
                prefix="presence"
              />
            </Grid>
          </DictInput>
          <StickyActionBar>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Save')}
            </SubmitButton>
          </StickyActionBar>
        </Grid>
      </Forminator>
    </ServerValueProvider>
  );
}
