import { equals, identity, sortBy } from 'ramda';

export const arrayEqualSort = (v1: string[] | undefined, v2: string[] | undefined) => {
  return equals(sortBy(identity, v1 || []), sortBy(identity, v2 || []));
};
