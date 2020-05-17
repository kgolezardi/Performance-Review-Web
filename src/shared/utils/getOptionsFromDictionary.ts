import { Option } from 'src/shared/forminator/types';
import { keys } from 'ramda';

export function getOptionsFromDictionary<E extends string>(dictionary: Record<E, string>): Option[] {
  return keys(dictionary).map((key) => ({ value: key, label: dictionary[key] }));
}
