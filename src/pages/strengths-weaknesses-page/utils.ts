import { equals, filter } from 'ramda';
import { isNotNil } from 'src/shared/utils/general.util';

import { Equal } from './ArrayValuePrompt';

export const normalizeArray = (array: readonly (string | null | undefined)[] | null | undefined) => {
  if (array && array.length) {
    return array.filter<string>(isNotNil);
  }
  return undefined;
};

export const arrayEqual: Equal = (fragmentValue, propValue) => {
  return equals(filter(Boolean, fragmentValue || []), filter(Boolean, propValue || []));
};
