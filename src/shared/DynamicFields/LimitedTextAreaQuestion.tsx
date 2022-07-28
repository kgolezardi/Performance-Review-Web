import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Question } from 'src/core/domain';
import { LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD, LIMITED_TEXT_AREA_MAX_CHARS } from 'src/shared/constants';
import { helpTextRenderers } from 'src/shared/react-markdown';
import LimitedTextAreaInput from '../forminator/inputs/LimitedTextAreaInput';

interface OwnProps {
  question: Question;
}

type Props = React.PropsWithChildren<OwnProps>;

export function LimitedTextAreaQuestion(props: Props) {
  const {
    question: { helpText, label },
  } = props;

  return (
    <LimitedTextAreaInput
      label={label}
      maxChars={LIMITED_TEXT_AREA_MAX_CHARS}
      counterDisplayThreshold={LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD}
      variant="outlined"
      fullWidth
      helperText={<ReactMarkdown renderers={helpTextRenderers}>{helpText ?? ''}</ReactMarkdown>}
    />
  );
}
