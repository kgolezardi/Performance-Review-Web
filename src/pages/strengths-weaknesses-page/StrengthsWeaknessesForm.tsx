import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import { equals, filter } from 'ramda';
import React, { useContext } from 'react';
import { ActionBar } from 'src/shared/action-bar';
import { useFormDirty } from 'src/shared/form-change-detector';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import { SectionGuide } from 'src/shared/section-guide';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { StrengthsOrWeaknesses } from 'src/shared/strengths-weaknesses';
import { FCProps } from 'src/shared/types/FCProps';
import { ArrayValuePrompt, Equal } from './ArrayValuePrompt';
import { StrengthsWeaknessesFormData } from './StrengthsWeaknessesPage';

const DescriptionContentSelfReview = importMDX.sync('./DescriptionContentSelfReview.mdx');

interface OwnProps {
  initialValue?: StrengthsWeaknessesFormData;
  onSubmit: (data: StrengthsWeaknessesFormData) => void;
  isSelfReview: boolean;
}

type Props = FCProps<OwnProps>;

const arrayEqual: Equal = (fragmentValue, propValue) => {
  return equals(filter(Boolean, fragmentValue || []), filter(Boolean, propValue || []));
};

export function StrengthsWeaknessesForm(props: Props) {
  const { onSubmit, isSelfReview } = props;
  const components = useContext(MDXContext);

  const dirty = useFormDirty();

  return (
    <Forminator onSubmit={onSubmit} initialValue={props.initialValue}>
      <Grid container spacing={4}>
        <DictInput>
          <Grid item xs={12}>
            <SectionGuide>
              {isSelfReview ? <DescriptionContentSelfReview components={components} /> : null}
            </SectionGuide>
          </Grid>
          <DictInputItem field="strengths">
            <Grid item xs={12}>
              <StrengthsOrWeaknesses
                maxLength={3}
                title={
                  isSelfReview
                    ? i18n._('The most important characteristics or effective behaviors that I should maintain')
                    : i18n._('The most important characteristics or effective behaviors that he/she should maintain')
                }
                label={isSelfReview ? i18n._('What to continue doing') : i18n._('What should he/she continue doing')}
              />
              <ArrayValuePrompt value={props.initialValue?.strengths} equal={arrayEqual} />
            </Grid>
          </DictInputItem>

          <DictInputItem field="weaknesses">
            <Grid item xs={12}>
              <StrengthsOrWeaknesses
                maxLength={3}
                title={
                  isSelfReview
                    ? i18n._('The most important characteristics or behaviors I should improve in myself')
                    : i18n._('The most important characteristics or behaviors he/she should improve')
                }
                label={isSelfReview ? i18n._('What to improve') : i18n._('What should he/she improve')}
              />
              <ArrayValuePrompt value={props.initialValue?.weaknesses} equal={arrayEqual} />
            </Grid>
          </DictInputItem>
        </DictInput>
        <StickyBottomPaper>
          <ActionBar>
            <SubmitButton variant="contained" color="primary" disabled={!dirty}>
              {i18n._('Save')}
            </SubmitButton>
          </ActionBar>
        </StickyBottomPaper>
      </Grid>
    </Forminator>
  );
}
