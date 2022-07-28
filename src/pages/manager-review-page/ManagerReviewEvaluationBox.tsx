import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  text?: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewEvaluationBox(props: Props) {
  const { children, text } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography className={classes.text} gutterBottom>
        {text}
      </Typography>
      <div className={classes.rating}>{children}</div>
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.grey[100],
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
      '@media print': {
        display: 'none !important',
      },
    },
    text: {
      color: theme.palette.grey[700],
    },
    rating: {
      width: '320px',
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewEvaluationBox' });
type StyleProps = Styles<typeof styles>;
