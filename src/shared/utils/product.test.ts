import { product } from './product';

describe('product function', () => {
  it('should product empty array', () => {
    const p = product();
    expect(p).toEqual([]);
  });

  it('should product array with length 1', () => {
    const p = product([1, 3]);
    expect(p).toEqual([[1], [3]]);
  });

  it('should product two arrays', () => {
    const p = product([1, 2], ['a', 'b']);
    expect(p).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });

  it('should product multiple arrays', () => {
    const p = product([1, 2], ['a', 'b'], [false]);
    expect(p).toEqual([
      [1, 'a', false],
      [1, 'b', false],
      [2, 'a', false],
      [2, 'b', false],
    ]);
  });

  it('should product array contained empty item', () => {
    const p = product([1, 2], []);
    expect(p).toEqual([]);
  });
});
