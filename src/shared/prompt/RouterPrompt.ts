import { useCallback } from 'react';
import { useBlocker } from 'react-router-dom';
import { useConfirmContext } from 'src/shared/confirm-provider';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  message: string;
  when?: boolean;
}

type Props = FCProps<OwnProps>;

export function useRouterPrompt(message: string, when: boolean) {
  const getUserConfirmation = useConfirmContext();
  let blocker = useCallback(
    tx => {
      getUserConfirmation(message, result => {
        if (result) {
          tx.retry();
        }
      });
    },
    [message, getUserConfirmation],
  );

  useBlocker(blocker, when);
}

export function RouterPrompt(props: Props) {
  const { when = true, message } = props;
  useRouterPrompt(message, when);
  return null;
}
