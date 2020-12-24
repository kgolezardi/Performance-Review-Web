import React, { ComponentProps } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

import { MultilineOutput } from './MultilineOutput';

interface OwnProps extends ComponentProps<typeof MultilineOutput> {
  index: number;
}

type Props = FCProps<OwnProps> & StyleProps;

export function NumberedMultilineOutput(props: Props) {
  const classes = useStyles(props);
  return <MultilineOutput {...props} className={classes.root} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: (props: Props) => ({
      '&:first-of-type:before': {
        content: `"${props.index + 1}. "`,
        fontWeight: 'bold',
      },
    }),
  });

const useStyles = makeStyles(styles, { name: 'NumberedMultilineOutput' });
type StyleProps = Styles<typeof styles>;
