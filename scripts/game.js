import Level1 from 'scripts/Level1.js';
import Level2 from 'scripts/Scene2.js';

//loads scenes
let level1 = new Level1();
let level2 = new Level2();

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

game.scene.add('Level 1', level1)
game.scene.add('Level 2', level2)