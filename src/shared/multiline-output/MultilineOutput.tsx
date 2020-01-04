import { Typography, TypographyProps } from '@material-ui/core';
import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends Omit<TypographyProps, 'children'> {
  value: string;
}

type Props = FCProps<OwnProps>;

export function MultilineOutput(props: Props) {
  const { value, ...typographyProps } = props;

  const splitString = value.split('\n');

  return (
    <Fragment>
      {splitString.map(str => (
        <Typography {...typographyProps}>{str}</Typography>
      ))}
    </Fragment>
  );
}
