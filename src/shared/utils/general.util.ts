import { complement, isNil } from 'ramda';

export const isNotNil = <T>(item: T | null | undefined): item is T => complement(isNil)(item);
