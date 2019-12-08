import { ForminatorFragment } from '../fragment/ForminatorFragment';

export class UndefinedOwnerError extends Error {
  constructor(fragment: ForminatorFragment) {
    super(`Fragment ${fragment.id}'s owner is undefined`);
  }
}
