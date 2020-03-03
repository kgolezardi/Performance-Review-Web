import React, { Component, Fragment, createRef } from 'react';
import { styled } from '@material-ui/core';

import Asteroid from './Asteroid';
import Ship from './Ship';
import { randomNumBetweenExcluding } from './helpers';

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32,
  ESC: 27,
};

export default class Reacteroids extends Component {
  constructor() {
    super();
    this.state = {
      screen: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      context: null,
      keys: {
        left: 0,
        right: 0,
        up: 0,
        down: 0,
        space: 0,
      },
      asteroidCount: 3,
      currentScore: 0,
      topScore: localStorage['topscore'] || 0,
      inGame: false,
    };
    this.ship = [];
    this.asteroids = [];
    this.bullets = [];
    this.particles = [];
    this.canvas = createRef();
    this.containerRef = createRef();

    this.handleKeysUp = this.handleKeysUp.bind(this);
    this.handleKeysDown = this.handleKeysDown.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(value, e) {
    const width = this.containerRef.current.offsetWidth;
    const height = this.containerRef.current.offsetHeight;
    this.setState({
      screen: {
        ...this.state.screen,
        width,
        height,
      },
    });
  }

  handleKeys(value, e) {
    let keys = this.state.keys;
    if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
    if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
    if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
    if (e.keyCode === KEY.SPACE) keys.space = value;
    this.setState({
      keys: keys,
    });
    // exit game
    if (e.keyCode === KEY.ESC) this.props.onExit();
  }

  handleKeysUp(e) {
    this.handleKeys(false, e);
  }

  handleKeysDown(e) {
    this.handleKeys(true, e);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeysUp);
    window.addEventListener('keydown', this.handleKeysDown);
    window.addEventListener('resize', this.handleResize);

    const width = this.containerRef.current.offsetWidth;
    const height = this.containerRef.current.offsetHeight;

    const context = this.canvas.current.getContext('2d');
    this.setState({ screen: { width, height }, context });
    this.startGame();
    requestAnimationFrame(() => {
      this.update();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeysUp);
    window.removeEventListener('keydown', this.handleKeysDown);
    window.removeEventListener('resize', this.handleResize);
  }

  update() {
    const context = this.state.context;

    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);

    // Motion trail
    context.fillStyle = '#000';
    context.globalAlpha = 0.4;
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;

    // Next set of asteroids
    if (!this.asteroids.length) {
      let count = this.state.asteroidCount + 1;
      this.setState({ asteroidCount: count });
      this.generateAsteroids(count);
    }

    // Check for colisions
    this.checkCollisionsWith(this.bullets, this.asteroids);
    this.checkCollisionsWith(this.ship, this.asteroids);

    // Remove or render
    this.updateObjects(this.particles, 'particles');
    this.updateObjects(this.asteroids, 'asteroids');
    this.updateObjects(this.bullets, 'bullets');
    this.updateObjects(this.ship, 'ship');

    context.restore();

    // Next frame
    requestAnimationFrame(() => {
      this.update();
    });
  }

  addScore(points) {
    if (this.state.inGame) {
      this.setState({
        currentScore: this.state.currentScore + points,
      });
    }
  }

  startGame() {
    this.setState({
      inGame: true,
      currentScore: 0,
    });

    // Make ship
    let ship = new Ship({
      position: {
        x: this.state.screen.width / 2,
        y: this.state.screen.height / 2,
      },
      create: this.createObject.bind(this),
      onDie: this.gameOver.bind(this),
    });
    this.createObject(ship, 'ship');

    // Make asteroids
    this.asteroids = [];
    this.generateAsteroids(this.state.asteroidCount);
  }

  gameOver() {
    this.setState({
      inGame: false,
    });

    // Replace top score
    if (this.state.currentScore > this.state.topScore) {
      this.setState({
        topScore: this.state.currentScore,
      });
      localStorage['topscore'] = this.state.currentScore;
    }
  }

  generateAsteroids(howMany) {
    let ship = this.ship[0];
    for (let i = 0; i < howMany; i++) {
      let asteroid = new Asteroid({
        size: 50,
        position: {
          x: randomNumBetweenExcluding(0, this.state.screen.width, ship.position.x - 60, ship.position.x + 60),
          y: randomNumBetweenExcluding(0, this.state.screen.height, ship.position.y - 60, ship.position.y + 60),
        },
        create: this.createObject.bind(this),
        addScore: this.addScore.bind(this),
      });
      this.createObject(asteroid, 'asteroids');
    }
  }

  createObject(item, group) {
    this[group].push(item);
  }

  updateObjects(items, group) {
    let index = 0;
    for (let item of items) {
      if (item.delete) {
        this[group].splice(index, 1);
      } else {
        items[index].render(this.state);
      }
      index++;
    }
  }

  checkCollisionsWith(items1, items2) {
    var a = items1.length - 1;
    var b;
    for (a; a > -1; --a) {
      b = items2.length - 1;
      for (b; b > -1; --b) {
        var item1 = items1[a];
        var item2 = items2[b];
        if (this.checkCollision(item1, item2)) {
          item1.destroy();
          item2.destroy();
        }
      }
    }
  }

  checkCollision(obj1, obj2) {
    var vx = obj1.position.x - obj2.position.x;
    var vy = obj1.position.y - obj2.position.y;
    var length = Math.sqrt(vx * vx + vy * vy);
    if (length < obj1.radius + obj2.radius) {
      return true;
    }
    return false;
  }

  getEndGameMessage() {
    if (this.state.currentScore <= 0) {
      return '0 points... So sad.';
    } else if (this.state.currentScore >= this.state.topScore) {
      return 'Top score with ' + this.state.currentScore + ' points. Woo!';
    } else {
      return this.state.currentScore + ' Points though :)';
    }
  }

  render() {
    return (
      <Container ref={this.containerRef}>
        {!this.state.inGame && (
          <EndGame>
            <p>Game over, man!</p>
            <p>{this.getEndGameMessage()}</p>
            <Button onClick={this.startGame.bind(this)}>try again?</Button>
          </EndGame>
        )}
        <CurrentScoreSpan>Score: {this.state.currentScore}</CurrentScoreSpan>
        <TopScoreSpan>Top Score: {this.state.topScore}</TopScoreSpan>
        <Controls>
          Use [A][S][W][D] or [←][↑][↓][→] to MOVE
          <br />
          Use [SPACE] to SHOOT
          {this.props.onExit && (
            <Fragment>
              <br />
              Press [ESC] to EXIT
            </Fragment>
          )}
        </Controls>
        <canvas ref={this.canvas} width={this.state.screen.width} height={this.state.screen.height} />
      </Container>
    );
  }
}

const Container = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  color: 'white',
  direction: 'rtl',
  fontFamily: 'PT Mono',
});

const Controls = styled('span')({
  display: 'block',
  position: 'absolute',
  top: '15px',
  left: ' 50%',
  transform: 'translate(-50%, 0)',
  zIndex: 1,
  fontSize: '11px',
  textAlign: 'center',
  lineHeight: 1.6,
});

const CurrentScoreSpan = styled('span')({
  position: 'absolute',
  top: '15px',
  left: 20,
});

const TopScoreSpan = styled('span')({
  position: 'absolute',
  top: '15px',
  right: 20,
});

const EndGame = styled('div')({
  position: 'absolute',
  top: '50%',
  left: ' 50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  textAlign: 'center',
  lineHeight: 1.6,
  fontSize: 12,
});

const Button = styled('button')({
  borderWidth: 4,
  borderColor: 'white',
  borderStyle: 'solid',
  color: 'white',
  fontSize: 16,
  padding: '8px 16px',
  backgroundColor: 'transparent',
  fontFamily: 'PT Mono',
  '&:hover': {
    backgroundColor: 'white',
    color: 'black',
  },
});
