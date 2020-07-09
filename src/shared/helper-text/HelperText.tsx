import HelpIcon from '@material-ui/icons/Help';
import React, { ReactNode } from 'react';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { usePrintingContext } from 'src/shared/layouts/dashboard-layouts/PrintingContext';

interface OwnProps {
  text: ReactNode;
}

type Props = FCProps<OwnProps>;

/**
 * Renders `HelpIcon` with the provided `text` in the tooltip.
 * In print mode it renders the text instead of the `HelpIcon`.
 *
 * @param props.text helper text content
 */
export function HelperText(props: Props) {
  const { text } = props;
  const printing = usePrintingContext();

  return printing ? (
    <Box display="block" width="100%">
      <Typography variant="subtitle2">{text}</Typography>
    </Box>
  ) : (
    <Tooltip title={text}>
      <Box display="flex" paddingLeft={1} alignItems="center">
        <HelpIcon fontSize="small" color="action" />
      </Box>
    </Tooltip>
  );
}
