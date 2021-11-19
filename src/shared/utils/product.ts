import { liftN } from 'ramda';

/**
 * Returns product of given arrays
 * @param args - Multiple params as array 
 * @example
 * // return []
 * product()
 * @example
 * // return [[1],[3]]
 * product([1,3])
 * @example
 * // return [
 *    [1, 'a', false],
      [1, 'b', false],
      [2, 'a', false],
      [2, 'b', false],
    ]
 * product([1, 2], ['a', 'b'], [false])
 * @returns {any[][]}
 */
export const product = (...args: any[][]): any[][] => {
  const n = args.length;
  if (n === 0) {
    return [];
  }
  const fn = (...items: any[]) => [...items];
  return liftN(n, fn)(...args);
};
