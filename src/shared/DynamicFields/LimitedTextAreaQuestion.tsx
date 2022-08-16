import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import LimitedTextAreaInput, { LimitedTextAreaInputClasses } from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import { LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD, LIMITED_TEXT_AREA_MAX_CHARS } from 'src/shared/constants';
import { Question } from 'src/core/domain';
import { helpTextRenderers } from 'src/shared/react-markdown';

interface OwnProps {
  question: Question;
}

type Props = React.PropsWithChildren<OwnProps> & LimitedTextAreaInputClasses;

export function LimitedTextAreaQuestion(props: Props) {
  const {
    question: { helpText, label },
    classes,
  } = props;

  return (
    <LimitedTextAreaInput
      label={label}
      classes={classes}
      maxChars={LIMITED_TEXT_AREA_MAX_CHARS}
      counterDisplayThreshold={LIMITED_TEXT_AREA_COUNTER_DISPLAY_THRESHOLD}
      variant="outlined"
      fullWidth
      helperText={<ReactMarkdown renderers={helpTextRenderers}>{helpText ?? ''}</ReactMarkdown>}
    />
  );
}
