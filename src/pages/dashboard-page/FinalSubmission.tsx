import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useAuthGuardUser } from 'src/core/auth';
import { ConfirmButton } from 'src/shared/confirm-button';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { useFinalSubmissionMutation } from './finalizeSubmission.mutation';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function FinalSubmission(props: Props) {
  const { enqueueSnackbar } = useBiDiSnackbar();
  const { id: revieweeId } = useAuthGuardUser();

  const finalSubmissionMutation = useFinalSubmissionMutation();
  const handleFinalizingSubmit = useCallback(() => {
    finalSubmissionMutation({ input: { revieweeId } })
      .then(res => {
        //TODO: Add popup to thank the user
      })
      .catch(error => {
        enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
      });
  }, [enqueueSnackbar, revieweeId, finalSubmissionMutation]);

  return (
    <Box marginY={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm xs={12}>
          <Typography>
            هنوز قابلیت ارسال ارزیابی برای شما فعال نشده. هنوز قابلیت ارسال ارزیابی برای شما فعال نشده. هنوز هنوز قابلیت
            ارسال ارزیابی برای شما فعال نشده. هنوز قابلیت ارسال ارزیابی برای شما فعال نشده. قابلیت ارسال ارزیابی برای
            شما فعال نشده.
          </Typography>
        </Grid>
        <Grid item>
          <ConfirmButton
            buttonText={i18n._('Finish and send review')}
            text={i18n._(
              "Once you finish the process and submit forms, you wouldn't be able to edit forms and forms will be sent to us. Are you sure?",
            )}
            onConfirm={handleFinalizingSubmit}
            buttonProps={{ variant: 'contained', color: 'secondary' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
