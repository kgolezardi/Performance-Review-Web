import * as React from 'react';
import clsx from 'clsx';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ClassKeyOfStyles } from '@material-ui/styles/withStyles';
import {
  Button as MuiButton,
  ButtonClassKey,
  ButtonTypeMap as MuiButtonTypeMap,
  Theme,
  fade,
  makeStyles,
} from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

type ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> = {
  props: P & Omit<MuiButtonTypeMap<P, D>['props'], 'color' | 'classes'>;
  defaultComponent: MuiButtonTypeMap<P, D>['defaultComponent'];
};

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<Record<ButtonClassKey | ClassKeyOfStyles<typeof styles>, string>>;
    /**
     * The color of the component.
     * @default 'primary'
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'grey';
  }
> = OverrideProps<ButtonTypeMap<P, D>, D>;

export function Button(props: ButtonProps) {
  const { className, color, variant = 'text', ...rest } = props;

  const classes = useStyles(props);
  const { textGrey, outlinedGrey, containedGrey, ...buttonClasses } = classes;

  return (
    <MuiButton
      color={color === 'grey' ? 'inherit' : color}
      variant={variant}
      {...rest}
      className={clsx(className, {
        disabled: classes.disabled,
        [classes.textGrey]: color === 'grey' && variant === 'text',
        [classes.outlinedGrey]: color === 'grey' && variant === 'outlined',
        [classes.containedGrey]: color === 'grey' && variant === 'contained',
      })}
      classes={buttonClasses}
    />
  );
}

const styles = (theme: Theme) => ({
  /* Styles applied to the root element if `variant="text"` and `color="grey"`. */
  textGrey: {
    color: theme.palette.grey[700],
    '&:hover': {
      backgroundColor: fade(theme.palette.grey[700], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  } as CSSProperties,
  /* Styles applied to the root element if `variant="outlined"` and `color="grey"`. */
  outlinedGrey: {
    color: theme.palette.grey[700],
    border: `1px solid ${fade(theme.palette.grey[700], 0.5)}`,
    '&:hover': {
      border: `1px solid ${theme.palette.grey[700]}`,
      backgroundColor: fade(theme.palette.grey[700], theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&$disabled': {
      border: `1px solid ${theme.palette.action.disabled}`,
    },
  } as CSSProperties,
  /* Styles applied to the root element if `variant="contained"` and `color="grey"`. */
  containedGrey: {
    color: theme.palette.getContrastText(theme.palette.grey[600]),
    backgroundColor: theme.palette.grey[600],
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[600],
      },
    } as CSSProperties,
  },
  disabled: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Button' });
