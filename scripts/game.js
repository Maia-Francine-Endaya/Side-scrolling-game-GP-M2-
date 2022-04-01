var config = {
  type: Phaser.AUTO,
  width: 1770,
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

var game = new Phaser.Game(config);

var scoreText;
var livesCounter;
var ground;

function preload() {
  this.load.image('background', './assets/images/Background-Placeholder.PNG');
  this.load.image('coin', './assets/images/Coin-Placeholder.PNG');
  this.load.image('player', './assets/images/Player-Placeholder.PNG');
  this.load.image('hazard', './assets/images/Hazard-Placeholder.PNG');
  this.load.image('platform', './assets/images/Platform-Placeholder.PNG');
};

function create() {
  this.add.image(400, 300, 'background');

  ground = this.physics.add.staticGroup();

  ground.create(400, 580, 'platform');
  ground.create(1000, 580, 'platform');
  ground.create(1400, 580, 'platform');
  ground.create(1700, 580, 'platform');
  ground.create(750, 220, 'platform');
};

function update() {

};