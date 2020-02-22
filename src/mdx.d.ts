declare module 'mdx.macro' {
  import { MDXComponentProps } from '@mdx-js/react';

  export function importMDX(path: string): Promise<{ default: React.ComponentType<MDXComponentProps> }>;
  export namespace importMDX {
    function sync(path: string): React.ComponentType<MDXComponentProps>;
  }
}
