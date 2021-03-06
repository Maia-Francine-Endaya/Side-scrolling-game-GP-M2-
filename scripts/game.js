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
var hazard;

var cursors;
var goal;

var score = 0;
var scoreText;
var coinsCollected = 0;
var collectedText;
var lives = 3;
var livesCounter;
var winText;

var win;
var gameOver;

function preload() {
  this.load.image('background', './assets/images/Sky.PNG');
  this.load.image('ground', './assets/images/Platform.PNG');
  this.load.image('coin', './assets/images/Coin.PNG');
  this.load.image('goal', './assets/images/Goal.PNG');
  this.load.image('hazard', './assets/images/Hazard.PNG')
  this.load.spritesheet('dude',
    './assets/images/dude.png', { frameWidth: 32, frameHeight: 48 })
};

function create() {
  this.add.image(400, 300, 'background');
  this.add.image(1400, 300, 'background');

  //Score
  scoreText = this.add.text(400, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  collectedText = this.add.text(18, 65, 'Coins Collected: 0', { fontSize: '32px,', fill: '#000' });

  //Lives
  livesCounter = this.add.text(16, 16, 'Lives: 3', { fontSize: '32px', fill: '#000' });

  //Platforms
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 598, 'ground');

  platforms.create(100, 598, 'ground');
  platforms.create(900, 598, 'ground');
  platforms.create(1200, 598, 'ground');
  platforms.create(1700, 598, 'ground');

  platforms.create(1000, 430, 'ground');
  platforms.create(1400, 510, 'ground');
  platforms.create(600, 340, 'ground');
  platforms.create(200, 260, 'ground');


  //Player
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(false);
  player.body.setGravityY(290);

  //Player Animation
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  //Coins
  coins = this.physics.add.group({
    key: 'coin',
    repeat: 13,
    setXY: { x: 100, y: 0, stepX: 130 }
  });

  coins.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
  });

  //Goal
  goal = this.physics.add.staticGroup();
  goal.create(40, 220, 'goal');

  //Hazards
  hazards = this.physics.add.staticGroup();

  hazards.create(620, 590, 'hazard');
  hazards.create(650, 590, 'hazard');
  hazards.create(680, 590, 'hazard');

  hazards.create(1420, 590, 'hazard');
  hazards.create(1450, 590, 'hazard');
  hazards.create(1480, 590, 'hazard');

  hazards.create(695, 310, 'hazard');
  hazards.create(560, 310, 'hazard');
  hazards.create(425, 310, 'hazard');

  hazards.create(290, 230, 'hazard');
  hazards.create(155, 230, 'hazard');

  //Cursors
  cursors = this.input.keyboard.createCursorKeys();

  //Physics
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(coins, platforms);

  this.physics.add.overlap(player, coins, collectCoin, null, this);
  this.physics.add.overlap(player, goal, winFunction, null, this);
  this.physics.add.overlap(player, hazards, loseLives, null, this);
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

  coins.disableBody(true, true);

  score += 10;
  coinsCollected += 1;

  scoreText.setText('Score: ' + score);
  collectedText.setText('Coins Collected: ' + coinsCollected);
}

//Function of ending the game when goal is reached
function winFunction(player, goal) {
  this.physics.pause();

  goal.disableBody(true, true);

  //Win Text
  winText = this.add.text(600, 300, 'YOU WIN!', { fontSize: '100px', fill: '#000' });

  player.setTint(0xffb608);
  player.anims.play('turn');
  win = true;
}

//Function of subtracting lives as player collides with hazards
function loseLives(player, hazards) {

  lives -= 1;
  livesCounter.setText('Lives Left: ' + lives)

  if (lives == 0) {
    this.physics.pause();
    player.setTint(0xbd0000);
    player.anims.play('turn');

    gameOverText = this.add.text(600, 300, 'YOU LOSE!', { fontSize: '100px', fill: '#000' })
    gameOver = true;
  }
}