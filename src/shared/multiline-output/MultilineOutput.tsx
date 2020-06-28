import React, { Fragment, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { Theme, Typography, TypographyProps, styled } from '@material-ui/core';
import { i18n } from '@lingui/core';

interface OwnProps extends Omit<TypographyProps, 'children'> {
  value: string | null;
  enableTruncating?: boolean;
  maxLength?: number;
}

type Props = FCProps<OwnProps>;

export function MultilineOutput(props: Props) {
  const { value, defaultValue = '---', enableTruncating = false, maxLength = 500, ...typographyProps } = props;

  const [truncated, setTruncated] = useState(enableTruncating);

  const canBeTruncated = value !== null && value.length > maxLength && enableTruncating;
  const truncatedValue = truncated ? value?.substring(0, maxLength) : value;
  const splitString = (truncatedValue || NON_BREAKING_SPACE).split('\n');

  const handleClick = () => {
    setTruncated((truncated) => !truncated);
  };

  if (!value) {
    return (
      <Typography color="textSecondary" {...typographyProps}>
        {defaultValue}
      </Typography>
    );
  }

  return (
    <Fragment>
      {splitString.map((str, index, splitString) => (
        <WrappedTypography color="textPrimary" {...typographyProps} key={index}>
          {str}
          {index === splitString.length - 1 && canBeTruncated && (
            <Fragment>
              {truncated && <span>...</span>}
              <TruncationButton onClick={handleClick}>
                <Fragment> {truncated ? i18n._('See More') : i18n._('See Less')}</Fragment>
              </TruncationButton>
            </Fragment>
          )}
        </WrappedTypography>
      ))}
    </Fragment>
  );
}

const WrappedTypography = styled(Typography)({
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
});

const TruncationButton = styled('span')(({ theme }: { theme: Theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));
