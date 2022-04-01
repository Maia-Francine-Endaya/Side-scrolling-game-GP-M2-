var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var scoreText;
var livesCounter;

function preload() {
  this.load.image('background', './assets/images/Background-Placeholder.PNG')
  this.load.image('coin', './assets/images/Coin-Placeholder.PNG')
  this.load.image('player', './assets/images/Player-Placeholder.PNG');
  this.load.image('hazard', './assets/images/Hazard-Placeholder.PNG');
  this.load.image('platform', './assets/images/Platform-Placeholder.PNG');
};

function create() {
  this.add.image(400, 300, 'background');
};

function update() {

};