import * as React from 'react';
import { Typography } from '@material-ui/core';

import { useQuestionOutputContext } from './QuestionOutputProvider';

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export function QuestionOutput(props: Props) {
  const question = useQuestionOutputContext();

  return (
    <Typography color="textSecondary" gutterBottom>
      {question.label}
    </Typography>
  );
}
