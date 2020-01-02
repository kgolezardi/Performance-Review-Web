import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { amber, deepOrange, green, lightBlue } from '@material-ui/core/colors';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends Omit<CircularProgressProps, 'color' | 'variant'> {
  color?: 'low' | 'medium' | 'high' | 'complete';
}

type Props = FCProps<OwnProps> & StyleProps;

export function CircularProgress(props: Props) {
  const { children, color, value: finalValue = 0, ...rest } = props;
  const classes = useStyles(props);
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(finalValue);
  }, [finalValue]);

  return (
    <div className={classes.root}>
      <MuiCircularProgress
        {...rest}
        variant="static"
        value={100}
        classes={{
          root: classes.backgroundCircularProgressRoot,
          circle: classes.backgroundCircularProgressCircle,
        }}
      />
      <MuiCircularProgress
        {...rest}
        variant="static"
        value={value}
        classes={{
          root: classes.circularProgressRoot,
          circle: clsx(classes.circularProgressCircle, {
            [classes.circularProgressColorLowSvg]: color === 'low',
            [classes.circularProgressColorMediumSvg]: color === 'medium',
            [classes.circularProgressColorHighSvg]: color === 'high',
            [classes.circularProgressColorCompleteSvg]: color === 'complete',
          }),
          svg: clsx(classes.circularProgressColorDefaultSvg, {
            [classes.circularProgressColorLowSvg]: color === 'low',
            [classes.circularProgressColorMediumSvg]: color === 'medium',
            [classes.circularProgressColorHighSvg]: color === 'high',
            [classes.circularProgressColorCompleteSvg]: color === 'complete',
          }),
        }}
      />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    display: 'inline-block',
    position: 'relative',
  } as CSSProperties,
  backgroundCircularProgressRoot: {
    position: 'absolute',
  } as CSSProperties,
  backgroundCircularProgressCircle: {
    color: theme.palette.grey[300],
    transformOrigin: 'center center',
    transform: 'translate(10%,10%) scale(0.8)',
  } as CSSProperties,
  circularProgressRoot: {} as CSSProperties,
  circularProgressColorDefaultSvg: {
    filter: `drop-shadow(0 0 2px ${lighten(theme.palette.primary.main, 0.6)})`,
  } as CSSProperties,
  circularProgressColorLowSvg: {
    color: deepOrange[300],
    filter: `drop-shadow(0 0 2px ${lighten(deepOrange[300], 0.6)})`,
  } as CSSProperties,
  circularProgressColorMediumSvg: {
    color: amber[400],
    filter: `drop-shadow(0 0 2px ${lighten(amber[400], 0.6)})`,
  } as CSSProperties,
  circularProgressColorHighSvg: {
    color: lightBlue[400],
    filter: `drop-shadow(0 0 2px ${lighten(lightBlue[400], 0.6)})`,
  } as CSSProperties,
  circularProgressColorCompleteSvg: {
    color: green[500],
    filter: `drop-shadow(0 0 2px ${lighten(green[500], 0.6)})`,
  } as CSSProperties,
  content: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  } as CSSProperties,
  circularProgressCircle: {
    strokeLinecap: 'round',
    transformOrigin: 'center center',
    transform: 'translate(10%,10%) scale(0.8)',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'CircularProgress' });
type StyleProps = Styles<typeof styles>;
