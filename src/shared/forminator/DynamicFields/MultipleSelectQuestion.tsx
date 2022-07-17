import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { FormHelperText } from '@material-ui/core';
import { defaultRenderers } from 'src/shared/react-markdown';

import SelectMultiAutoComplete from '../inputs/SelectMultiAutoComplete';
import { useQuestionContext } from './providers/QuestionProvider';

interface OwnProps {}

type Props = React.PropsWithChildren<OwnProps>;

export function MultipleSelectQuestion(props: Props) {
  const {
    question: { helpText, choices, label },
  } = useQuestionContext();

  const options = React.useMemo(() => {
    return choices?.map((opt) => ({ value: opt, label: opt })) ?? [];
  }, [choices]);

  return (
    <>
      <SelectMultiAutoComplete filterSelectedOptions label={label} options={options} />
      {helpText && (
        <FormHelperText>
          <ReactMarkdown renderers={defaultRenderers}>{helpText ?? ''}</ReactMarkdown>
        </FormHelperText>
      )}
    </>
  );
}
