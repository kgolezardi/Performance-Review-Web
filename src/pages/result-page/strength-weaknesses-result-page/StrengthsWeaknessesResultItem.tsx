import React, { Fragment } from 'react';
import { Box, Divider, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';

interface OwnProps {
  items?: string[] | null;
  isSelfReview: boolean;
}

export type Props = FCProps<OwnProps>;

export function StrengthsWeaknessesResultItem(props: Props) {
  const { items, isSelfReview } = props;
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <Paper style={{ backgroundColor: isSelfReview ? '#F0F0C0' : '#F0F0F0', marginBottom: 8 }}>
      {items?.map((item, index) => (
        <Fragment key={index}>
          <Box p={1}>
            <MultilineOutput value={item} />
          </Box>
          <Divider />
        </Fragment>
      ))}
    </Paper>
  );
}
