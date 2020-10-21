import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { LinearProgress } from 'src/shared/progress';
import { i18n } from '@lingui/core';

interface OwnProps {
  /**
   * Number of evaluated performance-competencies or achievements
   */
  evaluatedItems: number;
  max: number;
  type: 'achievements' | 'performance-competencies';
}

type Props = FCProps<OwnProps>;

export function ManagerReviewProgress(props: Props) {
  const { max, type, evaluatedItems } = props;

  const color = getColor(evaluatedItems, max);
  const text = getText(evaluatedItems, max, type);

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{text}</Typography>
      <Box width="240px" marginTop={1}>
        <LinearProgress color={color} value={(evaluatedItems / max) * 100} />
      </Box>
    </Box>
  );
}

const getColor = (evaluatedItems: number, max: number) => {
  if (evaluatedItems === 0) {
    return undefined;
  }
  if (evaluatedItems === max) {
    return 'complete';
  }
  return 'medium';
};

const getText = (evaluatedItems: number, max: number, type: 'achievements' | 'performance-competencies') => {
  if (evaluatedItems === 0) {
    return type === 'performance-competencies'
      ? i18n._("You haven't evaluated any performance competencies yet")
      : i18n._("You haven't evaluated any achievements yet");
  }
  if (evaluatedItems === max) {
    return type === 'performance-competencies'
      ? i18n._('You have evaluated all {max} performance competencies. You can change them when you want to.', {
          max,
        })
      : i18n._('You have evaluated all {max} achievements. You can change them when you want to.', { max });
  }
  return type === 'performance-competencies'
    ? i18n._('{evaluatedItems} of {max} performance competencies are evaluated', { max, evaluatedItems })
    : i18n._('{evaluatedItems} of {max} achievements are evaluated', { max, evaluatedItems });
};
