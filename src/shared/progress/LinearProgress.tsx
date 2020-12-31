import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import {
  LinearProgress as MuiLinearProgress,
  LinearProgressProps,
  Theme,
  createStyles,
  lighten,
  makeStyles,
} from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { amber, deepOrange, green, lightBlue } from '@material-ui/core/colors';

interface OwnProps extends Omit<LinearProgressProps, 'color' | 'variant'> {
  // TODO: Add a `default` type, so not providing `color` prop means using the `mappingFn`
  color?: 'low' | 'medium' | 'high' | 'complete';
  // TODO: We probabely should add this `mappingFn` prop and add a default `mappingFn`
  // 1. Checking `color` prop, if it is not undefined, use the `color`
  // 2. If `color` prop is undefined, use the `mappingFn`
  // 3. If `mappingFn` is undefined, use the default `MappingFn`
  // mappingFn?: (value: number) => 'low' | 'medium' | 'high' | 'complete' | 'default';
}

type Props = FCProps<OwnProps> & StyleProps;

export function LinearProgress(props: Props) {
  const { color, value: finalValue = 0, ...rest } = props;
  const classes = useStyles(props);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(finalValue);
  }, [finalValue]);

  return (
    <MuiLinearProgress
      {...rest}
      value={value}
      variant="determinate"
      classes={{
        root: classes.root,
        bar: clsx(classes.bar, classes.barDefaultColor, {
          [classes.barAnimated]: value,
          [classes.barLowColor]: color === 'low',
          [classes.barMediumColor]: color === 'medium',
          [classes.barHighColor]: color === 'high',
          [classes.barCompleteColor]: color === 'complete',
        }),
      }}
    />
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      overflow: 'visible',
      backgroundColor: theme.palette.grey[300],
      height: 8,
      borderRadius: theme.spacing(),
    },
    bar: {
      transition: 'width .4s linear',
      transform: 'none !important',
      width: 0,
      borderRadius: theme.spacing(),
    },
    barAnimated: (props: Props) => ({
      width: `${props.value || 0}%`,
    }),
    barDefaultColor: {
      filter: `drop-shadow(0 0 2px ${lighten(theme.palette.primary.main, 0.6)})`,
    },
    barLowColor: {
      backgroundColor: deepOrange[300],
      filter: `drop-shadow(0 0 2px ${lighten(deepOrange[300], 0.6)})`,
    },
    barMediumColor: {
      backgroundColor: amber[400],
      filter: `drop-shadow(0 0 2px ${lighten(amber[400], 0.6)})`,
    },
    barHighColor: {
      backgroundColor: lightBlue[400],
      filter: `drop-shadow(0 0 2px ${lighten(lightBlue[400], 0.6)})`,
    },
    barCompleteColor: {
      backgroundColor: green[500],
      filter: `drop-shadow(0 0 2px ${lighten(green[500], 0.6)})`,
    },
  });

const useStyles = makeStyles(styles, { name: 'LinearProgress' });
type StyleProps = Styles<typeof styles>;
