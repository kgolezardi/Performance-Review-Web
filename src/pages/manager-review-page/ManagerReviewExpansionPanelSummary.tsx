import { i18n } from '@lingui/core';
import { Box, ExpansionPanelSummaryProps, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Evaluation } from '../dashboard-page/__generated__/AchievementsIndicators_projects.graphql';

interface OwnProps extends ExpansionPanelSummaryProps {
  rating: Evaluation | null;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ManagerReviewEvaluationExpansionPanelSummary(props: Props) {
  const { children, rating } = props;
  const classes = useStyles(props);

  return (
    <ExpansionPanelSummary {...props} className={classes.root}>
      <Box display="flex" flexDirection="column">
        <Box display="flex">{children}</Box>
        <div className={classes.evaluation}>
          <Box color="grey.700" marginRight={2}>
            <Typography>{i18n._('Your evaluation:')}</Typography>
          </Box>
          <EvaluationOutput type="peer" value={rating} />
        </div>
      </Box>
    </ExpansionPanelSummary>
  );
}

const styles = (theme: Theme) => ({
  root: {},
  evaluation: {
    display: 'flex',
    marginTop: theme.spacing(2),
    '.Mui-expanded &': {
      display: 'none',
    },
  },
});

const useStyles = makeStyles(styles, { name: 'ManagerReviewEvaluationExpansionPanelSummary' });
type StyleProps = Styles<typeof styles>;
