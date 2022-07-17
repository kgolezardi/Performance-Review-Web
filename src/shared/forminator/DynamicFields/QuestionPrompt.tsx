import * as React from 'react';

import FragmentPrompt from '../utils/FragmentPrompt';
import { useQuestionContext } from './providers/QuestionProvider';

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export function QuestionPrompt(props: Props) {
  const {
    formData,
    answersKey,
    question: { id, questionType },
  } = useQuestionContext();

  const initialValue = questionType === 'CHECKBOX_MULTIPLE' ? [] : '';

  const fieldValue = formData[answersKey][id] ?? initialValue;

  return <FragmentPrompt value={fieldValue} />;
}
