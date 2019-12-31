import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import React, { useContext } from 'react';
import { CriterionItem } from 'src/shared/criterion-item';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { StickyActionBar } from 'src/shared/sticky-action-bar';
import { FCProps } from 'src/shared/types/FCProps';
import { CriteriaFormData } from './CriteriaPage';
import { CriteriaDescriptionCard } from './description/CriteriaDescriptionCard';

const OrganizationCultureAdoptionContent = React.lazy(() => importMDX('./OrganizationCultureAdoptionContent.mdx'));
const ProblemSolvingContent = React.lazy(() => importMDX('./ProblemSolvingContent.mdx'));
const ExecutionContent = React.lazy(() => importMDX('./ExecutionContent.mdx'));
const LeadershipContent = React.lazy(() => importMDX('./LeadershipContent.mdx'));
const ThoughtLeadershipContent = React.lazy(() => importMDX('./ThoughtLeadershipContent.mdx'));
const CollaborationContent = React.lazy(() => importMDX('./CollaborationContent.mdx'));

interface OwnProps {
  initialValue?: CriteriaFormData;
  onSubmit: (data: CriteriaFormData) => void;
}

type Props = FCProps<OwnProps>;

export function CriteriaForm(props: Props) {
  const { onSubmit } = props;
  const components = useContext(MDXContext);

  return (
    <Forminator onSubmit={onSubmit} initialValue={props.initialValue}>
      <DictInput>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CriteriaDescriptionCard />
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
              details={<CollaborationContent components={components} />}
              prefix="presence"
            />
          </Grid>

          <StickyActionBar elevation={8}>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Submit')}
            </SubmitButton>
          </StickyActionBar>
        </Grid>
      </DictInput>
    </Forminator>
  );
}
