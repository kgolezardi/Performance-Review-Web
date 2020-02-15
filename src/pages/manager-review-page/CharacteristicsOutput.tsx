import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { MultilineOutput } from 'src/shared/multiline-output';
import { FCProps } from 'src/shared/types/FCProps';
import { isNotNil } from 'src/shared/utils/general.util';
import { OutputBorder } from 'src/shared/output-border';

interface OwnProps {
  title: string;
  characteristics: ReadonlyArray<string | null> | null;
}

type Props = FCProps<OwnProps>;

export function CharacteristicsOutput(props: Props) {
  const { title, characteristics } = props;
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
              <OutputBorder>
                <MultilineOutput value={characteristic} />
              </OutputBorder>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
