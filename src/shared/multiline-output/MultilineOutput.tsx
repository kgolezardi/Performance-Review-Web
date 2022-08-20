import React, { Fragment, useState } from 'react';
import { Box, Theme, Typography, TypographyProps, styled } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { i18n } from '@lingui/core';
import { usePrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';

interface OwnProps extends Omit<TypographyProps, 'children'> {
  value: string | null;
  enableTruncating?: boolean;
  maxLength?: number;
}

type Props = FCProps<OwnProps>;

export function MultilineOutput(props: Props) {
  const { value, defaultValue = '---', enableTruncating = true, maxLength = 500, ...typographyProps } = props;

  const printing = usePrintingContext();
  const [truncated, setTruncated] = useState(enableTruncating);

  const canBeTruncated = value !== null && value.length > maxLength && enableTruncating;
  const shouldBeTruncated = truncated && !printing;
  const truncatedValue = shouldBeTruncated ? value?.substring(0, maxLength) : value;
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
          {index === splitString.length - 1 && canBeTruncated && !printing && (
            <Box display="inline-block" displayPrint="none" component="span">
              {truncated && <span>...</span>}
              <TruncationButton onClick={handleClick}>
                <Box display="inline-block" paddingLeft="4px" component="span">
                  {truncated ? i18n._('See More') : i18n._('See Less')}
                </Box>
              </TruncationButton>
            </Box>
          )}
        </WrappedTypography>
      ))}
    </Fragment>
  );
}

const WrappedTypography = styled(Typography)({
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  '@media print': {
    pageBreakInside: 'avoid',
  },
});

const TruncationButton = styled('span')(({ theme }: { theme: Theme }) => ({
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));
