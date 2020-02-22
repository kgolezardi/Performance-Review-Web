import { Typography, TypographyProps } from '@material-ui/core';
import React, { Fragment } from 'react';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps extends Omit<TypographyProps, 'children'> {
  value: string | null;
}

type Props = FCProps<OwnProps>;

export function MultilineOutput(props: Props) {
  const { value, defaultValue = '---', ...typographyProps } = props;
  const splitString = (value || NON_BREAKING_SPACE).split('\n');

  if (!value) {
    return (
      <Typography color="textSecondary" {...typographyProps}>
        {defaultValue}
      </Typography>
    );
  }

  return (
    <Fragment>
      {splitString.map((str, index) => (
        <Typography color="textPrimary" {...typographyProps} key={index}>
          {str}
        </Typography>
      ))}
    </Fragment>
  );
}
