import { rotatePoint } from './helpers';

export default class Bullet {
  position: any;
  rotation: any;
  velocity: any;
  radius: any;
  delete: any;
  constructor(args: any) {
    let posDelta = rotatePoint({ x: 0, y: -20 }, { x: 0, y: 0 }, (args.ship.rotation * Math.PI) / 180);
    this.position = {
      x: args.ship.position.x + posDelta.x,
      y: args.ship.position.y + posDelta.y,
    };
    this.rotation = args.ship.rotation;
    this.velocity = {
      x: posDelta.x / 2,
      y: posDelta.y / 2,
    };
    this.radius = 2;
    this.delete = false;
  }

  destroy() {
    this.delete = true;
  }

  render(state: any) {
    // Move
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Delete if it goes out of bounds
    if (
      this.position.x < 0 ||
      this.position.y < 0 ||
      this.position.x > state.screen.width ||
      this.position.y > state.screen.height
    ) {
      this.destroy();
    }

    // Draw
    const context = state.context;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate((this.rotation * Math.PI) / 180);
    context.fillStyle = '#FFF';
    context.lineWidth = 0.5;
    context.beginPath();
    context.arc(0, 0, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.restore();
  }
}
