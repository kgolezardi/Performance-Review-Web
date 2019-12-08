import { ForminatorFragment } from '../fragment/ForminatorFragment';

export class EmptyFragmentError extends Error {
  constructor(fragment: ForminatorFragment) {
    super(`Fragment ${fragment.id} has not value`);
  }
}
