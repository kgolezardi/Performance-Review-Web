import 'relay-runtime';

declare module 'relay-runtime' {
  interface RecordSourceSelectorProxy {
    /**
     * Globally invalidates the Relay store. This will cause any data that was written to the store before invalidation occurred to be
     * considered stale, and will be considered to require refetch the next time a query is
     * checked with `environment.check()`.
     */
    invalidateStore(): void;
  }
}
