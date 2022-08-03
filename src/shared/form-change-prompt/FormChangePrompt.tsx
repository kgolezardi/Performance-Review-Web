import React, { Fragment } from 'react';
import { Prompt as RouterPrompt } from 'react-router-dom';
import { useFormChangeDetectorContext } from 'src/shared/form-change-detector';
import { FCProps } from 'src/shared/types/FCProps';
import { UnloadPrompt } from 'src/shared/unload-prompt';

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
