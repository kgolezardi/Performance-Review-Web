import { Direction } from '@material-ui/core';

export class DirectionState {
  constructor(private direction: Direction = 'rtl') {}

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  getDirection(): Direction {
    return this.direction;
  }
}
