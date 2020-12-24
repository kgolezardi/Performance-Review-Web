import React, { ReactNode } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { HelperText } from 'src/shared/helper-text/HelperText';
import { Styles } from 'src/shared/types/Styles';
import { Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {
  description?: ReactNode;
  title: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewPerformanceCompetenciesCriteriaHeading(props: Props) {
  const { description, title } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Typography variant="h3">{title}</Typography>
      <HelperText text={description} />
    </div>
  );
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    '@media print': {
      display: 'block',
    },
  },
});

const useStyles = makeStyles(styles, { name: 'ManagerReviewPerformanceCompetenciesCriteriaHeading' });
type StyleProps = Styles<typeof styles>;
