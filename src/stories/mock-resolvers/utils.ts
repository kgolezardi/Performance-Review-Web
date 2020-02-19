export const ID = (id: string) => btoa(id);
export type OmitRefType<T> = Omit<T, ' $refType'>;
