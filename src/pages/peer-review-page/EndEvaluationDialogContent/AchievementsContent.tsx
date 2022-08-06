import * as React from 'react';
import { Box, Table, TableBody, TableCell, TableRow, Typography, styled } from '@material-ui/core';
import { LinearProgress } from 'src/shared/progress';
import { getProgressBarColor } from 'src/shared/utils/getProgressBarColor';
import { i18n } from '@lingui/core';

import { BoldTypography } from './BoldTypography';

interface OwnProps {
  projectStates: [string, number][];
}

type Props = React.PropsWithChildren<OwnProps>;

export function AchievementsContent(props: Props) {
  const { projectStates } = props;

  if (!projectStates.length) {
    return null;
  }

  return (
    <>
      <BoldTypography>{i18n._('Achievements')}:</BoldTypography>
      <Table size="small">
        <colgroup>
          <col width="auto" />
          <col width="100%" />
        </colgroup>
        <TableBody>
          {projectStates.map(([name, percentage], index) => (
            <TableRow key={index}>
              <NoBorderTableCell>
                <Box width={1} maxWidth="30ch" display="inline-flex">
                  <Typography noWrap>{name}</Typography>
                  <Typography component="span">:</Typography>
                </Box>
              </NoBorderTableCell>
              <NoBorderTableCell>
                <LinearProgress value={percentage} color={getProgressBarColor(percentage)} />
              </NoBorderTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const NoBorderTableCell = styled(TableCell)({
  borderBottom: 'none',
});
