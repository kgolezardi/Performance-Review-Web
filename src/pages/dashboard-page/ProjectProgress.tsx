import React from 'react';
import { Box, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { LinearProgress } from 'src/shared/progress';
import { Styles } from 'src/shared/types/Styles';
import { getProgressBarColor } from 'src/shared/utils/getProgressBarColor';
import { i18n } from '@lingui/core';

interface OwnProps {
  name: React.ReactNode;
  value: number;
  consultedWithManager: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ProjectProgress(props: Props) {
  const { name, value, consultedWithManager } = props;
  const classes = useStyles(props);
  const color = getProgressBarColor(value);
  return (
    <Box marginY={3} className={classes.root}>
      <Typography gutterBottom>
        {name}
        {!consultedWithManager ? (
          <Typography component="span" variant="caption" color="error">
            {` (${i18n._('The manager has not been consulted')})`}
          </Typography>
        ) : null}
      </Typography>
      <LinearProgress value={value} color={color} />
    </Box>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '&:first-child': {
        marginTop: 0,
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'ProjectProgress' });
type StyleProps = Styles<typeof styles>;
