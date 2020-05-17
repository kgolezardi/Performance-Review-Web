import React, { FormEventHandler, FormHTMLAttributes, useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Omit } from '@material-ui/core';

import { useSubmitContext } from '../core/submit/SubmitContext';

interface OwnProps extends Omit<FormHTMLAttributes<any>, 'onSubmit'> {}

type Props = FCProps<OwnProps>;

function Form(props: Props) {
  const submit = useSubmitContext();
  const onSubmit: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      submit();
    },
    [submit],
  );
  return <form {...props} onSubmit={onSubmit} />;
}

export default Form;
