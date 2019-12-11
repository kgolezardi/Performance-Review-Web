import React from 'react';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import StrengthsOrWeaknesses from 'src/shared/strengths-weaknesses/StrengthsOrWeaknesses';
import { i18n } from '@lingui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessesFormData } from './StrengthsWeaknessesPage';

interface OwnProps {
  onSubmit: (data: StrengthsWeaknessesFormData) => void;
}

type Props = FCProps<OwnProps>;

export function StrengthsWeaknessesForm(props: Props) {
  const { onSubmit } = props;

  return (
    <Forminator onSubmit={onSubmit}>
      <DictInput>
        <DictInputItem field="strengths">
          <StrengthsOrWeaknesses maxLength={3} title={i18n._('Strengths')} />
        </DictInputItem>

        <DictInputItem field="weaknesses">
          <StrengthsOrWeaknesses maxLength={3} title={i18n._('Weaknesses')} />
        </DictInputItem>

        <SubmitButton variant="contained" color="primary">
          {i18n._('Submit')}
        </SubmitButton>
      </DictInput>
    </Forminator>
  );
}
