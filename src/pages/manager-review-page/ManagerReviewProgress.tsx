import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { LinearProgress } from 'src/shared/progress';
import { i18n } from '@lingui/core';

interface OwnProps {
  evaluatedItems: number;
  total: number;
  type: 'achievements';
}

type Props = FCProps<OwnProps>;

export function ManagerReviewProgress(props: Props) {
  const { evaluatedItems, total, type } = props;

  const state = getState(evaluatedItems, total);
  const color = ManagerReviewColorDictionary[state];
  const text = ManagerReviewTextDictionary[type][state];

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{text(evaluatedItems, total)}</Typography>
      <Box width="240px" marginTop={1}>
        <LinearProgress color={color} value={(evaluatedItems / total) * 100} />
      </Box>
    </Box>
  );
}

type ProgressState = 'not-started' | 'in-progress' | 'completed';

const getState = (evaluatedItems: number, total: number): ProgressState => {
  if (evaluatedItems === 0) {
    return 'not-started';
  }
  if (evaluatedItems === total) {
    return 'completed';
  }
  return 'in-progress';
};

const ManagerReviewColorDictionary: Record<ProgressState, 'complete' | 'medium' | undefined> = {
  'not-started': undefined,
  'in-progress': 'medium',
  completed: 'complete',
};

const ManagerReviewAchievementsTextDictionary: Record<
  ProgressState,
  (evaluatedItems: number, total: number) => string
> = {
  'not-started': (evaluatedItems: number, total: number) => i18n._("You haven't evaluated any achievements yet"),
  'in-progress': (evaluatedItems: number, total: number) =>
    i18n._('{evaluatedItems} of {total} achievements are evaluated', { evaluatedItems, total }),
  completed: (evaluatedItems: number, total: number) =>
    i18n._('You have evaluated all {total} achievements. You can change them whenever you want to.', { total }),
};

const ManagerReviewTextDictionary: Record<
  'achievements',
  Record<ProgressState, (evaluatedItems: number, total: number) => string>
> = {
  achievements: ManagerReviewAchievementsTextDictionary,
};
