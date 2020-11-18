import React, { Fragment } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Prompt as RouterPrompt } from 'react-router-dom';
import { UnloadPrompt } from 'src/shared/unload-prompt';
import { useUnsavedDetectorContext } from 'src/shared/unsaved-detector';

interface OwnProps {
  message: string;
}

type Props = FCProps<OwnProps>;

export function UnsavedPrompt(props: Props) {
  const { message } = props;

  const context = useUnsavedDetectorContext();
  if (context == null) {
    throw Error('UnsavedPrompt must be used inside of an <UnsavedDetector />');
  }

  return (
    <Fragment>
      <RouterPrompt message={message} when={context.unsaved} />
      <UnloadPrompt message={message} when={context.unsaved} />
    </Fragment>
  );
}
