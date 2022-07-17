import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box } from '@material-ui/core';
import { LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD, LIMITED_TEXT_AREA_MAX_CHARS } from 'src/shared/constants';
import { defaultRenderers } from 'src/shared/react-markdown';

import LimitedTextAreaInput from '../inputs/LimitedTextAreaInput';
import { useQuestionContext } from './providers/QuestionProvider';

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export function LimitedTextAreaQuestion(props: Props) {
  const {
    question: { helpText, label },
  } = useQuestionContext();

  return (
    <LimitedTextAreaInput
      label={label}
      maxChars={LIMITED_TEXT_AREA_MAX_CHARS}
      counterDisplayThreshold={LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD}
      variant="outlined"
      fullWidth
      helperText={
        <Box component="span" display="flex" alignItems="center">
          <ReactMarkdown renderers={defaultRenderers}>{helpText ?? ''}</ReactMarkdown>
        </Box>
      }
    />
  );
}
