import * as React from 'react';
import { Question } from 'src/core/domain';

import SelectMultiAutoComplete from '../forminator/inputs/SelectMultiAutoComplete';

interface OwnProps {
  question: Question;
}

type Props = React.PropsWithChildren<OwnProps>;

export function MultipleSelectQuestion(props: Props) {
  const {
    question: { helpText, choices, label },
  } = props;

  const options = React.useMemo(() => {
    return choices?.map((opt) => ({ value: opt, label: opt })) ?? [];
  }, [choices]);

  return (
    <SelectMultiAutoComplete
      filterSelectedOptions
      label={label}
      options={options}
      textFieldOptions={{ helperText: helpText }}
    />
  );
}
