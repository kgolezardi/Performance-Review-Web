import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ActionBar } from 'src/shared/action-bar';
import { ArrayValuePrompt } from 'src/pages/strengths-weaknesses-page/ArrayValuePrompt';
import { Box } from '@material-ui/core';
import { DictInput, DictInputItem, Forminator, SubmitButton } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsOrWeaknesses } from 'src/shared/strengths-weaknesses';
import { StrengthsWeaknessResultExpansionPanel } from 'src/pages/result-page/strengths-weaknesses-result-page/StrengthsWeaknessResultExpansionPanel';
import { arrayEqual, normalizeArray } from 'src/pages/strengths-weaknesses-page/utils';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';
import { usePrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';

import { ManagerReviewDominantCharacteristicsQuery } from './__generated__/ManagerReviewDominantCharacteristicsQuery.graphql';
import { managerReviewPersonMutation } from '../managerReviewPersonMutation';

const query = graphql`
  query ManagerReviewDominantCharacteristicsQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          id
        }
        ...StrengthsWeaknessesOutput_user
        managerPersonReview {
          strengths
          weaknesses
        }
      }
    }
  }
`;

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

type FormData = {
  strengths: readonly string[] | undefined;
  weaknesses: readonly string[] | undefined;
};

export default function ManagerReviewDominantCharacteristics(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ManagerReviewDominantCharacteristicsQuery>(query, { id: revieweeId });
  const reviews = data.viewer.user?.personReviews;
  const { enqueueSnackbar } = useBiDiSnackbar();
  const printing = usePrintingContext();

  const saveManagerPersonReview = useMutation(managerReviewPersonMutation);
  const handleSubmit = async (formData: FormData) => {
    try {
      await saveManagerPersonReview({
        input: { weaknesses: formData.weaknesses, strengths: formData.strengths, revieweeId },
      });
      enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
    }
  };

  const isDirty = useFormDirty();
  const reviewee = data.viewer.user;

  if (!reviews || !reviewee) {
    return <Box padding={4}>no data</Box>;
  }

  const managerPersonReview = data.viewer.user?.managerPersonReview ?? null;
  const initialValue: FormData = {
    weaknesses: normalizeArray(managerPersonReview?.weaknesses),
    strengths: normalizeArray(managerPersonReview?.strengths),
  };

  return (
    <Box padding={4}>
      <Forminator onSubmit={handleSubmit} initialValue={initialValue}>
        <DictInput>
          <StrengthsWeaknessResultExpansionPanel
            reviewee={reviewee}
            title={i18n._('The most important characteristics or effective behaviors that he/she should maintain')}
            type="strengths"
            showMangerPersonReviewOnlyInPrint
          >
            {!printing ? (
              <Box mt={2}>
                <DictInputItem field="strengths">
                  <StrengthsOrWeaknesses maxLength={3} label={i18n._('What should he/she continue doing')} />
                  <ArrayValuePrompt value={initialValue.strengths} equal={arrayEqual} />
                </DictInputItem>
              </Box>
            ) : null}
          </StrengthsWeaknessResultExpansionPanel>
          <StrengthsWeaknessResultExpansionPanel
            title={i18n._('The most important characteristics or behaviors he/she should improve')}
            reviewee={reviewee}
            type="weaknesses"
            showMangerPersonReviewOnlyInPrint
          >
            {!printing ? (
              <Box mt={2}>
                <DictInputItem field="weaknesses">
                  <StrengthsOrWeaknesses maxLength={3} label={i18n._('What should he/she improve')} />
                  <ArrayValuePrompt value={initialValue.weaknesses} equal={arrayEqual} />
                </DictInputItem>
              </Box>
            ) : null}
          </StrengthsWeaknessResultExpansionPanel>
        </DictInput>
        {!printing && (
          <ActionBar>
            <SubmitButton variant="contained" color="primary" disabled={!isDirty}>
              {i18n._('Save')}
            </SubmitButton>
          </ActionBar>
        )}
      </Forminator>
    </Box>
  );
}
