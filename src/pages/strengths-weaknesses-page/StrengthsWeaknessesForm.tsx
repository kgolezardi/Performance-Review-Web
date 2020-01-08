import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
import React from 'react';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import { StickyActionBar } from 'src/shared/sticky-action-bar';
import { StrengthsOrWeaknesses } from 'src/shared/strengths-weaknesses';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessDescriptionCard } from './description/StrengthsWeaknessDescriptionCard';
import { StrengthsWeaknessesFormData } from './StrengthsWeaknessesPage';

interface OwnProps {
  initialValue?: StrengthsWeaknessesFormData;
  onSubmit: (data: StrengthsWeaknessesFormData) => void;
}

type Props = FCProps<OwnProps>;

export function StrengthsWeaknessesForm(props: Props) {
  const { onSubmit } = props;

  return (
    <Grid container spacing={2}>
      <Forminator onSubmit={onSubmit} initialValue={props.initialValue}>
        <DictInput>
          <Grid item xs={12}>
            <StrengthsWeaknessDescriptionCard />
          </Grid>
          <DictInputItem field="strengths">
            <Grid item xs={12}>
              <StrengthsOrWeaknesses
                maxLength={3}
                title={i18n._('Most important characteristics or effective behaviours that I should maintain')}
                label={i18n._("What I'm awesome at")}
              />
            </Grid>
          </DictInputItem>

          <DictInputItem field="weaknesses">
            <Grid item xs={12}>
              <StrengthsOrWeaknesses
                maxLength={3}
                title={i18n._('Most important characteristics or behaviours I should improve in myself')}
                label={i18n._('What to improve')}
              />
            </Grid>
          </DictInputItem>
          <StickyActionBar elevation={8}>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Save')}
            </SubmitButton>
          </StickyActionBar>
        </DictInput>
      </Forminator>
    </Grid>
  );
}
