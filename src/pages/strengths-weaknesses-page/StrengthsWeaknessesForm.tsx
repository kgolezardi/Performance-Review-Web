import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import { equals, filter } from 'ramda';
import React, { useContext } from 'react';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import { SectionGuide } from 'src/shared/section-guide';
import { StrengthsOrWeaknesses } from 'src/shared/strengths-weaknesses';
import { FCProps } from 'src/shared/types/FCProps';
import { ArrayValuePrompt, Equal } from './ArrayValuePrompt';
import { StrengthsWeaknessesFormData } from './StrengthsWeaknessesPage';
import { StickyActionBar } from 'src/shared/sticky-action-bar';

const DescriptionContent = importMDX.sync('./DescriptionContent.mdx');

interface OwnProps {
  initialValue?: StrengthsWeaknessesFormData;
  onSubmit: (data: StrengthsWeaknessesFormData) => void;
}

type Props = FCProps<OwnProps>;

const arrayEqual: Equal = (fragmentValue, propValue) => {
  return equals(filter(Boolean, fragmentValue || []), filter(Boolean, propValue || []));
};

export function StrengthsWeaknessesForm(props: Props) {
  const { onSubmit } = props;
  const components = useContext(MDXContext);

  return (
    <Grid container spacing={4}>
      <Forminator onSubmit={onSubmit} initialValue={props.initialValue}>
        <DictInput>
          <Grid item xs={12}>
            <SectionGuide>
              <DescriptionContent components={components} />
            </SectionGuide>
          </Grid>
          <DictInputItem field="strengths">
            <Grid item xs={12}>
              <StrengthsOrWeaknesses
                maxLength={3}
                title={i18n._('Most important characteristics or effective behaviours that I should maintain')}
                label={i18n._("What I'm awesome at")}
              />
              <ArrayValuePrompt value={props.initialValue?.strengths || []} equal={arrayEqual} />
            </Grid>
          </DictInputItem>

          <DictInputItem field="weaknesses">
            <Grid item xs={12}>
              <StrengthsOrWeaknesses
                maxLength={3}
                title={i18n._('Most important characteristics or behaviours I should improve in myself')}
                label={i18n._('What to improve')}
              />
              <ArrayValuePrompt value={props.initialValue?.weaknesses || []} equal={arrayEqual} />
            </Grid>
          </DictInputItem>
          <StickyActionBar>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Save')}
            </SubmitButton>
          </StickyActionBar>
        </DictInput>
      </Forminator>
    </Grid>
  );
}
