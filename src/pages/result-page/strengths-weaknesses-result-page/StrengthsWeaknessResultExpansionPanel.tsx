import React from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessesOutput } from 'src/shared/strengths-weaknesses-output';
import { StrengthsWeaknessesOutput_reviews$key } from 'src/shared/strengths-weaknesses-output/__generated__/StrengthsWeaknessesOutput_reviews.graphql';
import { Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {
  title?: string;
  reviews: StrengthsWeaknessesOutput_reviews$key;
  anonymous?: boolean;
  type: 'strengths' | 'weaknesses';
  showMangerPersonReviewOnlyInPrint?: boolean;
}

type Props = FCProps<OwnProps>;

export function StrengthsWeaknessResultExpansionPanel(props: Props) {
  const { title, reviews, anonymous, type, showMangerPersonReviewOnlyInPrint = false } = props;

  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h3">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <StrengthsWeaknessesOutput
          reviews={reviews}
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
