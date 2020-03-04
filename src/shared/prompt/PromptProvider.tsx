import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Prompt as RouterPrompt } from 'react-router';
import { values } from 'ramda';

import { Prompt as UnloadPrompt } from './Prompt';

export interface PromptContextType {
  (id: string, state: boolean): void;
}
export interface PromptStateContextType {
  changed: boolean;
}
export const PromptContext = createContext<PromptContextType | null>(null);
export const PromptStateContext = createContext<PromptStateContextType | null>(null);

export function usePromptContext(): PromptContextType {
  const context = useContext(PromptContext);
  if (context === null) {
    throw new Error('usePromptContext must be used inside the <PromptProvider/>');
  }
  return context;
}
export function usePromptStateContext(): PromptStateContextType {
  const context = useContext(PromptStateContext);
  if (context === null) {
    throw new Error('usePromptStateContext must be used inside the <PromptProvider/>');
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
  const changed = useMemo(() => {
    return values(prompts).filter(Boolean).length > 0;
  }, [prompts]);
  const state = useMemo(() => ({ changed }), [changed]);
  return (
    <PromptStateContext.Provider value={state}>
      <PromptContext.Provider value={setPrompt}>
        <RouterPrompt message={props.message} when={changed} />
        <UnloadPrompt message={props.message} when={changed} />
        {props.children}
      </PromptContext.Provider>
    </PromptStateContext.Provider>
  );
}
