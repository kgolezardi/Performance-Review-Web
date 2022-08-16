import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {
  text?: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewEvaluationBox(props: Props) {
  const { children, text } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.text} gutterBottom>
        {text}
      </Typography>
      <div className={classes.rating}>{children}</div>
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '@media print': {
        display: 'none !important',
      },
    },
    text: {
      color: theme.palette.grey[700],
      marginBottom: theme.spacing(2),
    },
    rating: {
      width: '320px',
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewEvaluationBox' });
type StyleProps = Styles<typeof styles>;
