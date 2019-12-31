declare module 'mdx.macro' {
  export function importMDX(path: string): Promise<{ default: React.LazyExoticComponent }>;
  export namespace importMDX {
    function sync(path: string): React.LazyExoticComponent;
  }
}
