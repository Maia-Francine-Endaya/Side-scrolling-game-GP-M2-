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
var player;
var coin;
var coins;
var cursors;
var collectCoins;

function preload() {
  this.load.image('background', './assets/images/Background-Placeholder.PNG');
  this.load.image('coin', './assets/images/Coin-Placeholder.PNG');
  this.load.image('guy', './assets/images/Player-Placeholder.PNG');
  this.load.image('hazard', './assets/images/Hazard-Placeholder.PNG');
  this.load.image('platform', './assets/images/Platform-Placeholder.PNG');
};

function create() {
  //Sky
  this.add.image(400, 300, 'background');
  this.add.image(900, 300, 'background');
  this.add.image(1400, 300, 'background');

  //Ground
  ground = this.physics.add.staticGroup();

  ground.create(400, 580, 'platform');
  ground.create(1000, 580, 'platform');
  ground.create(1400, 580, 'platform');
  ground.create(1700, 580, 'platform');

  //Player Sprite
  player = this.physics.add.sprite(400, 450, 'guy');
  player.setBounce(0.2);
  player.setCollideWorldBounds(false);

  player.body.setGravityY(290);

  //Coins
  coins = this.physics.add.group({
    key: 'coin',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  coins.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));
  });

  //Cursors
  cursors = this.input.keyboard.createCursorKeys();

  //Collisions
  this.physics.add.collider(player, ground);
  this.physics.add.collider(coins, ground);
  this.physics.add.overlap(player, coins, collectCoins, null, this);
};

function update() {
  //Player Movement
  if (cursors.left.isDown) {
    player.setVelocityX(-170);
  }

  else if (cursors.right.isDown) {
    player.setVelocityX(170);
  }

  else (cursors.left.isDown)
  {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-320);
  }
};