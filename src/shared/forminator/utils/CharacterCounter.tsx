import { CircularProgress, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  chars: number;
  maxChars: number;
}

type Props = FCProps<OwnProps> & StyleProps;

function CharacterCounter({ chars, maxChars, ...props }: Props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress
        className={classes.circularProgress}
        variant="static"
        size={20}
        value={(chars * 100) / maxChars}
      />
      <Typography>
        {chars} / {maxChars}
      </Typography>
    </div>
  );
}

export default CharacterCounter;

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(0.5),
  } as CSSProperties,
  circularProgress: {
    marginRight: theme.spacing(),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'CharacterCounter' });
type StyleProps = Styles<typeof styles>;
