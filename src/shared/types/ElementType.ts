export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer R> ? R : never;
