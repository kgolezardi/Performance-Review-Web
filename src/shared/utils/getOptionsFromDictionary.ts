import { keys } from 'ramda';
import { Option } from 'src/shared/forminator/types';

export function getOptionsFromDictionary<E extends string>(dictionary: Record<E, string>): Option[] {
  return keys(dictionary).map(key => ({ value: key, label: dictionary[key] }));
}
