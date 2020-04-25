import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { Typography, TypographyProps, styled } from '@material-ui/core';

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
        <WrappedTypography color="textPrimary" {...typographyProps} key={index}>
          {str}
        </WrappedTypography>
      ))}
    </Fragment>
  );
}

const WrappedTypography = styled(Typography)({
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
});
