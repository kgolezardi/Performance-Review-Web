import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends Omit<TypographyProps, 'children' | 'classes'> {
  value: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function MultilineOutput(props: Props) {
  const { value, classes: classesProp, ...typographyProps } = props;

  const classes = useStyles(props);

  const splitString = value.split('\n');

  return (
    <div className={classes.root}>
      {splitString.map((str, index) => (
        <Typography {...typographyProps} key={index}>
          {str}
        </Typography>
      ))}
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'MultilineOutput' });
type StyleProps = Styles<typeof styles>;
