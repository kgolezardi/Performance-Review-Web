import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessesOutput } from 'src/shared/strengths-weaknesses-output';
import { StrengthsWeaknessesOutput_user$key } from 'src/shared/strengths-weaknesses-output/__generated__/StrengthsWeaknessesOutput_user.graphql';
import { Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {
  title?: string;
  reviewee: StrengthsWeaknessesOutput_user$key;
  anonymous?: boolean;
  type: 'strengths' | 'weaknesses';
  showMangerPersonReviewOnlyInPrint?: boolean;
}

type Props = FCProps<OwnProps>;

export function StrengthsWeaknessResultExpansionPanel(props: Props) {
  const { title, reviewee, anonymous, type, showMangerPersonReviewOnlyInPrint = false } = props;

  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h5">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <StrengthsWeaknessesOutput
          reviewee={reviewee}
          type={type}
          anonymous={anonymous}
          showMangerPersonReviewOnlyInPrint={showMangerPersonReviewOnlyInPrint}
        />
        {props.children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    expansionPanelDetails: {
      flexDirection: 'column',
    },
  });

const useStyles = makeStyles(styles, { name: 'StrengthsWeaknessResultExpansionPanel' });
