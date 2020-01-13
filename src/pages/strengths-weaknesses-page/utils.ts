import { complement, isEmpty } from 'ramda';
import { isNotNil } from 'src/shared/utils/general.util';

export const normalizeArray = (array: readonly (string | null | undefined)[] | null | undefined) => {
  if (array && array.length) {
    return array.filter<string>(isNotNil).filter(complement(isEmpty));
  }
  return undefined;
};
