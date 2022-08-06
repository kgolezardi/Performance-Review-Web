import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { i18n } from '@lingui/core';

import { BoldTypography } from './BoldTypography';

interface OwnProps {
  existWeaknesses: boolean;
  existStrengths: boolean;
}

type Props = React.PropsWithChildren<OwnProps>;

export function DominantCharacteristicsContent(props: Props) {
  const { existWeaknesses, existStrengths } = props;

  if (existWeaknesses && existStrengths) {
    return null;
  }

  return (
    <>
      <BoldTypography>{i18n._('Dominant Characteristics')}:</BoldTypography>
      <Box mt={1}>
        {!existStrengths && <Typography>{i18n._('You did not write any strengths')}</Typography>}
        {!existWeaknesses && <Typography>{i18n._('You did not write any weaknesses')}</Typography>}
      </Box>
    </>
  );
}
