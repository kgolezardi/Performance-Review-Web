import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps,
  Theme,
  createStyles,
  lighten,
  makeStyles,
} from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { amber, deepOrange, green, lightBlue } from '@material-ui/core/colors';

interface OwnProps extends Omit<CircularProgressProps, 'color' | 'variant'> {
  color?: 'low' | 'medium' | 'high' | 'complete' | 'error' | 'default';
  shadow?: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function CircularProgress(props: Props) {
  const { children, color = 'default', value: finalValue = 0, shadow, ...rest } = props;
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
            [classes.circularProgressColorErrorSvg]: color === 'error',
            [classes.circularProgressColorLowSvg]: color === 'low',
            [classes.circularProgressColorMediumSvg]: color === 'medium',
            [classes.circularProgressColorHighSvg]: color === 'high',
            [classes.circularProgressColorCompleteSvg]: color === 'complete',
          }),
          svg: clsx(classes.circularProgressColorDefaultSvg, {
            [classes.circularProgressColorDefaultSvg]: color === 'default' && shadow,
            [classes.circularProgressColorErrorSvg]: color === 'error',
            [classes.circularProgressColorErrorSvgShadow]: color === 'error' && shadow,
            [classes.circularProgressColorLowSvg]: color === 'low',
            [classes.circularProgressColorLowSvgShadow]: color === 'low' && shadow,
            [classes.circularProgressColorMediumSvg]: color === 'medium',
            [classes.circularProgressColorMediumSvgShadow]: color === 'medium' && shadow,
            [classes.circularProgressColorHighSvg]: color === 'high',
            [classes.circularProgressColorHighSvgShadow]: color === 'high' && shadow,
            [classes.circularProgressColorCompleteSvg]: color === 'complete',
            [classes.circularProgressColorCompleteSvgDropShadow]: color === 'complete' && shadow,
          }),
        }}
      />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      position: 'relative',
    },
    backgroundCircularProgressRoot: {
      position: 'absolute',
    },
    backgroundCircularProgressCircle: {
      color: theme.palette.grey[300],
      transformOrigin: 'center center',
      transform: 'translate(10%,10%) scale(0.8)',
      flip: false,
    },
    circularProgressRoot: {},
    circularProgressColorDefaultSvg: {},
    circularProgressColorDefaultSvgShadow: {
      filter: `drop-shadow(0 0 2px ${lighten(theme.palette.primary.main, 0.6)})`,
    },
    circularProgressColorErrorSvg: {
      color: theme.palette.error.main,
    },
    circularProgressColorErrorSvgShadow: {
      filter: `drop-shadow(0 0 2px ${lighten(theme.palette.error.main, 0.6)})`,
    },
    circularProgressColorLowSvg: {
      color: deepOrange[300],
    },
    circularProgressColorLowSvgShadow: {
      filter: `drop-shadow(0 0 2px ${lighten(deepOrange[300], 0.6)})`,
    },
    circularProgressColorMediumSvg: {
      color: amber[400],
    },
    circularProgressColorMediumSvgShadow: {
      filter: `drop-shadow(0 0 2px ${lighten(amber[400], 0.6)})`,
    },
    circularProgressColorHighSvg: {
      color: lightBlue[400],
    },
    circularProgressColorHighSvgShadow: {
      filter: `drop-shadow(0 0 2px ${lighten(lightBlue[400], 0.6)})`,
    },
    circularProgressColorCompleteSvg: {
      color: green[500],
    },
    circularProgressColorCompleteSvgDropShadow: {
      filter: `drop-shadow(0 0 2px ${lighten(green[500], 0.6)})`,
    },
    content: {
      position: 'absolute',
      top: '15%',
      right: '15%',
      left: '15%',
      bottom: '15%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
    circularProgressCircle: {
      strokeLinecap: 'round',
      transformOrigin: 'center center',
      transform: 'translate(10%,10%) scale(0.8)',
      flip: false,
    },
  });

const useStyles = makeStyles(styles, { name: 'CircularProgress' });
type StyleProps = Styles<typeof styles>;
