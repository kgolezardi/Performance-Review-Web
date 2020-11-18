import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Prompt as RouterPrompt } from 'react-router-dom';
import { UnloadPrompt } from 'src/shared/unload-prompt';
import { useFormChangeDetectorContext } from 'src/shared/form-change-detector';

interface OwnProps {
  message: string;
}

type Props = FCProps<OwnProps>;

export function FormChangePrompt(props: Props) {
  const { message } = props;

  const context = useFormChangeDetectorContext();
  if (context == null) {
    throw Error('FormChangePrompt must be used inside of an <FormChangeDetector />');
  }

  return (
    <Fragment>
      <RouterPrompt message={message} when={context.dirty} />
      <UnloadPrompt message={message} when={context.dirty} />
    </Fragment>
  );
}
