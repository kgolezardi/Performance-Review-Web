import * as React from 'react';
import { Typography } from '@material-ui/core';

interface OwnProps {
  questionLabel: string;
}

type Props = React.PropsWithChildren<OwnProps>;

export function QuestionOutput(props: Props) {
  const { questionLabel } = props;

  return (
    <Typography color="textSecondary" gutterBottom>
      {questionLabel}
    </Typography>
  );
}
