import { FCProps } from 'src/shared/types/FCProps';
import { useEffect, useRef } from 'react';

interface OwnProps {
  message: string;
  when?: boolean;
}

type Props = FCProps<OwnProps>;

export function UnloadPrompt(props: Props) {
  const { when, message } = props;
  const whenRef = useRef(when);
  const messageRef = useRef(message);
  useEffect(() => {
    whenRef.current = when;
    messageRef.current = message;
  }, [when, message]);
  useEffect(() => {
    const handler = (e: WindowEventMap['beforeunload']) => {
      if (whenRef.current) {
        const confirmationMessage = messageRef.current;

        e.returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Webkit, Safari, Chrome etc.
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, []);
  return null;
}
