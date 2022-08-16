import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import SelectMultiAutoComplete, {
  SelectMultiAutoCompleteClasses,
} from 'src/shared/forminator/inputs/SelectMultiAutoComplete';
import { FormHelperText } from '@material-ui/core';
import { Question } from 'src/core/domain';
import { helpTextRenderers } from 'src/shared/react-markdown';

interface OwnProps {
  question: Question;
}

type Props = React.PropsWithChildren<OwnProps> & SelectMultiAutoCompleteClasses;

export function MultipleSelectQuestion(props: Props) {
  const {
    question: { helpText, choices, label, maxChoices },
    classes,
  } = props;

  const options = React.useMemo(() => {
    return choices?.map((opt) => ({ value: opt, label: opt })) ?? [];
  }, [choices]);

  return (
    <>
      <SelectMultiAutoComplete
        classes={classes}
        filterSelectedOptions
        maximumValues={maxChoices}
        label={label}
        options={options}
      />
      {helpText && (
        <FormHelperText>
          <ReactMarkdown renderers={helpTextRenderers}>{helpText ?? ''}</ReactMarkdown>
        </FormHelperText>
      )}
    </>
  );
}
