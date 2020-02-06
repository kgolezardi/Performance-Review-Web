import { values } from 'ramda';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Prompt as UnloadPrompt } from './Prompt';
import { Prompt as RouterPrompt } from 'react-router-dom';

export interface PromptContextType {
  (id: string, state: boolean): void;
}
export const PromptContext = createContext<PromptContextType | null>(null);

export function usePromptContext(): PromptContextType {
  const context = useContext(PromptContext);
  if (context === null) {
    throw new Error('usePromptContext must be used inside the <PromptProvider/>');
  }
  return context;
}

export function usePrompt(id: string, state: boolean) {
  const setPrompt = usePromptContext();
  useEffect(() => {
    setPrompt(id, state);
    return () => {
      if (state /* === true*/) {
        setPrompt(id, false);
      }
    };
  }, [id, state, setPrompt]);
}

interface OwnProps {
  message: string;
}

type Props = FCProps<OwnProps>;

export function PromptProvider(props: Props) {
  const [prompts, setPrompts] = useState(() => ({}));
  const setPrompt = useCallback((id: string, state: boolean) => {
    setPrompts(w => ({ ...w, [id]: state }));
  }, []);
  const when = useMemo(() => {
    return values(prompts).filter(Boolean).length > 0;
  }, [prompts]);

  return (
    <PromptContext.Provider value={setPrompt}>
      <RouterPrompt message={props.message} when={when} />
      <UnloadPrompt message={props.message} when={when} />
      {props.children}
    </PromptContext.Provider>
  );
}
