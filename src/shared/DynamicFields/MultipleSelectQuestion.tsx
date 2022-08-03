import { FormHelperText } from '@material-ui/core';
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Question } from 'src/core/domain';
import SelectMultiAutoComplete from '../forminator/inputs/SelectMultiAutoComplete';
import { helpTextRenderers } from '../react-markdown';

interface OwnProps {
  question: Question;
}

type Props = React.PropsWithChildren<OwnProps>;

export function MultipleSelectQuestion(props: Props) {
  const {
    question: { helpText, choices, label, maxChoices },
  } = props;

  const options = React.useMemo(() => {
    return choices?.map((opt) => ({ value: opt, label: opt })) ?? [];
  }, [choices]);

  return (
    <>
      <SelectMultiAutoComplete filterSelectedOptions maximumValues={maxChoices} label={label} options={options} />
      {helpText && (
        <FormHelperText>
          <ReactMarkdown renderers={helpTextRenderers}>{helpText ?? ''}</ReactMarkdown>
        </FormHelperText>
      )}
    </>
  );
}
