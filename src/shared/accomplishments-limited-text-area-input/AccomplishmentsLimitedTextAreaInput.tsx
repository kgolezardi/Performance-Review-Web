import { i18n } from '@lingui/core';
import React, { ComponentProps, useCallback, useState } from 'react';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { FCProps } from 'src/shared/types/FCProps';
import { LimitedTextAreaInput } from '../forminator';
import { useFragmentValue } from '../forminator/core/utils/useFragmentValue';

const CHAR_LIMIT = 100;

interface OwnProps {}

type Props = FCProps<OwnProps> & ComponentProps<typeof LimitedTextAreaInput>;

function AccomplishmentsLimitedTextAreaInput(props: Props) {
  const { onBlur, ...rest } = props;

  const value = useFragmentValue<string>();
  const [touched, setTouched] = useState(false);

  const handleBlur = useCallback(
    e => {
      onBlur && onBlur(e);
      setTouched(true);
    },
    [onBlur],
  );

  const error = touched && (!value || (!!value && value.length < CHAR_LIMIT));

  const helperText = error
    ? i18n._('You should write at least {limit} character', { limit: CHAR_LIMIT })
    : NON_BREAKING_SPACE;

  return <LimitedTextAreaInput {...rest} onBlur={handleBlur} error={error} helperText={helperText} />;
}

export default AccomplishmentsLimitedTextAreaInput;
