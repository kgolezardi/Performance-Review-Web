import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Typography } from '@material-ui/core';
import { TypographyOutput } from 'src/shared/typography-output';

interface OwnProps {
  title: string;
  value: React.ReactNode;
}

type Props = FCProps<OwnProps>;

export function ItemOutput(props: Props) {
  const { title, value } = props;
  return (
    <div>
      <Typography color="textSecondary" gutterBottom variant="body2">
        {title}:
      </Typography>
      {typeof value === 'string' || value === null ? <TypographyOutput value={value} /> : value}
    </div>
  );
}
