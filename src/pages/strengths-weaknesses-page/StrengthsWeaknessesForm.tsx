import { i18n } from '@lingui/core';
import { Grid } from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import graphql from 'babel-plugin-relay/macro';
import { importMDX } from 'mdx.macro';
import { equals, filter } from 'ramda';
import React, { useContext } from 'react';
import { useFragment } from 'react-relay/hooks';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { SectionGuide } from 'src/shared/section-guide';
import { StickyActionBar } from 'src/shared/sticky-action-bar';
import { StrengthsOrWeaknesses } from 'src/shared/strengths-weaknesses';
import { FCProps } from 'src/shared/types/FCProps';
import { UserType } from 'src/shared/utils/getUserLabel';
import { StrengthsWeaknessesForm_user$key } from './__generated__/StrengthsWeaknessesForm_user.graphql';
import { ArrayValuePrompt, Equal } from './ArrayValuePrompt';
import { StrengthsWeaknessesFormData } from './StrengthsWeaknessesPage';

const DescriptionContentSelfReview = importMDX.sync('./DescriptionContentSelfReview.mdx');
const DescriptionContentPeerReview = importMDX.sync('./DescriptionContentPeerReview.mdx');

interface OwnProps {
  initialValue?: StrengthsWeaknessesFormData;
  onSubmit: (data: StrengthsWeaknessesFormData) => void;
  isSelfReview: boolean;
  user: StrengthsWeaknessesForm_user$key | null;
}

type Props = FCProps<OwnProps>;

const arrayEqual: Equal = (fragmentValue, propValue) => {
  return equals(filter(Boolean, fragmentValue || []), filter(Boolean, propValue || []));
};

export function StrengthsWeaknessesForm(props: Props) {
  const { onSubmit, isSelfReview } = props;
  const components = useContext(MDXContext);
  const user = useFragment(fragmentUserNode, props.user);

  return (
    <Forminator onSubmit={onSubmit} initialValue={props.initialValue}>
      <Grid container spacing={2}>
        <DictInput>
          <Grid item xs={12}>
            <SectionGuide>
              {isSelfReview ? (
                <DescriptionContentSelfReview components={components} />
              ) : (
                <MDXPropsProvider<UserType | null> value={user}>
                  <DescriptionContentPeerReview components={components} />
                </MDXPropsProvider>
              )}
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
              <ArrayValuePrompt value={props.initialValue?.strengths || []} equal={arrayEqual} />
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
              <ArrayValuePrompt value={props.initialValue?.weaknesses || []} equal={arrayEqual} />
            </Grid>
          </DictInputItem>
        </DictInput>
        <StickyActionBar>
          <SubmitButton variant="contained" color="primary">
            {i18n._('Save')}
          </SubmitButton>
        </StickyActionBar>
      </Grid>
    </Forminator>
  );
}

const fragmentUserNode = graphql`
  fragment StrengthsWeaknessesForm_user on UserNode {
    id
    ...getUserLabel_user
  }
`;

// #: src/pages/manager-review-page/DominantCharacteristics.tsx:15
// #: src/pages/strengths-weaknesses-page/StrengthsWeaknessesForm.tsx:48
// msgid "Most important characteristics or behaviours I should improve in myself"
// msgstr "مهمترین ویژگی‌ها یا رفتارهایی که باید توی خودم بهبود بدم"
//
// #: src/pages/strengths-weaknesses-page/StrengthsWeaknessesForm.tsx:49
// msgid "Most important characteristics or behaviours he/she should improve in myself"
// msgstr "مهمترین ویژگی‌ها یا رفتارهایی که باید خودش را بهبود بدهد"
//
// #: src/pages/manager-review-page/DominantCharacteristics.tsx:12
// #: src/pages/strengths-weaknesses-page/StrengthsWeaknessesForm.tsx:39
// msgid "Most important characteristics or effective behaviours that I should maintain"
// msgstr "مهمترین ویژگی ها یا رفتارهای مؤثری که باید ادامه شون بدم"
//
// #: src/pages/strengths-weaknesses-page/StrengthsWeaknessesForm.tsx:40
// msgid "Most important characteristics or effective behaviours that he/she should maintain"
// msgstr "مهمترین ویژگی ها یا رفتارهای مؤثری که باید ادامه شون بدهد"
