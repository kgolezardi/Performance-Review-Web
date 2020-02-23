import { i18n } from '@lingui/core';
import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { LanguageCodes } from 'src/core/locales/types';
import { MultilineOutput } from 'src/shared/multiline-output';
import { FCProps } from 'src/shared/types/FCProps';
import { isNotNil } from 'src/shared/utils/general.util';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';

interface OwnProps {
  title: string;
  characteristics: ReadonlyArray<string | null> | null;
}

type Props = FCProps<OwnProps>;

export function CharacteristicsList(props: Props) {
  const { title } = props;
  // make it a numbered list
  const characteristics = props.characteristics?.map((characteristic, index) => {
    const prefix = localizeNumber(index + 1, i18n.language as LanguageCodes) + '. ';
    if (characteristic) {
      characteristic = prefix + characteristic;
    }
    return characteristic;
  });

  return (
    <Box paddingTop={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Grid>
        {characteristics &&
          characteristics.filter(isNotNil).map((characteristic, index) => (
            <Grid item xs={12} key={index}>
              <MultilineOutput value={characteristic} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
