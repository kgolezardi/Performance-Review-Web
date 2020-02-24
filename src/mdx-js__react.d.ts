declare module '@mdx-js/react' {
  import * as React from 'react';

  type ComponentType =
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'thematicBreak'
    | 'blockquote'
    | 'ul'
    | 'ol'
    | 'li'
    | 'table'
    | 'tr'
    | 'td'
    | 'pre'
    | 'code'
    | 'em'
    | 'strong'
    | 'delete'
    | 'inlineCode'
    | 'hr'
    | 'a'
    | 'img';

  export type Components = {
    [key in ComponentType]?: React.ComponentType<React.PropsWithChildren<{}>>;
  };

  export interface MDXProviderProps {
    children: React.ReactNode;
    components: Components;
  }

  export interface MDXComponentProps {
    components: Components;
  }

  export class MDXProvider extends React.Component<MDXProviderProps> {}

  export function useMDXComponents(components: Components | ((components: Components) => Components)): Components;

  export function withMDXComponents<T extends MDXComponentProps>(
    Component: React.ComponentType<T>,
  ): React.ComponentType<T>;

  export const MDXContext: React.Context<Components>;
}
