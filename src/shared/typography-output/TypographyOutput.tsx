import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, Typography, TypographyProps, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps extends TypographyProps {
  defaultValue?: string;
  value: string | null;
}

type Props = FCProps<OwnProps> & StyleProps;

export function TypographyOutput(props: Props) {
  const { defaultValue = '---', value, ...otherProps } = props;
  const classes = useStyles(otherProps);

  const color: TypographyProps['color'] = value ? 'textPrimary' : 'textSecondary';

  return (
    <Typography className={classes.root} color={color} {...otherProps}>
      {value ?? defaultValue}
    </Typography>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

const useStyles = makeStyles(styles, { name: 'TypographyOutput' });
type StyleProps = Styles<typeof styles>;
