import { Typography, TypographyProps } from '@material-ui/core';
import React, { Fragment } from 'react';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends Omit<TypographyProps, 'children'> {
  value: string | null;
}

type Props = FCProps<OwnProps>;

export function MultilineOutput(props: Props) {
  const { value, ...typographyProps } = props;

  const splitString = (value || NON_BREAKING_SPACE).split('\n');

  return (
    <Fragment>
      {splitString.map((str, index) => (
        <Typography {...typographyProps} key={index}>
          {str}
        </Typography>
      ))}
    </Fragment>
  );
}
