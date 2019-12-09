import { Direction } from '@material-ui/core/styles/createMuiTheme';

export class DirectionState {
  constructor(private direction: Direction = 'rtl') {}

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  getDirection(): Direction {
    return this.direction;
  }
}
