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

var player;
var coins;
var platforms;

var cursors;

var score = 0;
var scoreText;
var coinsCollected = 0;
var collectedText;

function preload() {
  this.load.image('background', './assets/images/Background-Placeholder.PNG');
  this.load.image('ground', './assets/images/platform.png');
  this.load.image('coin', './assets/images/Coin-Placeholder.PNG');
  this.load.spritesheet('dude',
    './assets/dude.png', { frameWidth: 32, frameHeight: 48 })
};

function create() {

  scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  collectedText = this.add.text(16, 24, 'Coins Collected: 0', { fontSize: '32px,', fill: '#000' });
  this.add.image(400, 300, 'background');
  this.add.image(1400, 300, 'background');

  //Platforms
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 598, 'ground');

  platforms.create(900, 598, 'ground');
  platforms.create(1200, 598, 'ground');
  platforms.create(1700, 598, 'ground');


  //Player
  //TO DO: ADD PLAYER, FOR SOME REASON IT CAN'T MOVE LEFT AND RIGHT, BUT CAN JUMP
  player = this.physics.add.sprite(400, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(false);
  player.body.setGravityY(290);
  player.setOrigin(400, 450);

  //Player Animation
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('guy', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'guy', frame: 4 }],
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('guy', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  //Game Camera
  game.camera.follow(player);

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

  //Physics
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);

  this.physics.add.overlap(player, coins, collectCoin, null, this);

};

function update() {
  //Player Movement
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }

  else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }

  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

//Function of adding score and number of coins collected
function collectCoin(player, coins) {
  coins.disabledBody(true, true);

  score += 10;
  coinsCollected += 1;

  scoreText.setText('Score: ' + score);
  collectedText.setText('Coins Collected: ' + coinsCollected);
}