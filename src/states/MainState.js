export class MainState extends Phaser.State {
  init() {
    // add init code
    this.screenWidth = this.game.width;
    this.screenHeight = this.game.height;
    this.difficult = 10;
    this.score = 0;
  }
  preload() {
    this.game.load.image('player', 'assets/fruit.png');
    this.game.load.image('banana', 'assets/banana.png');
    this.game.load.image('apple', 'assets/fruit.png');
  }
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.cursor = this.game.input.keyboard.createCursorKeys();
    // create a player
    this.player = this.game.add.sprite(30, this.screenHeight - 100, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(0.05, 0.05);
    this.game.physics.arcade.enable(this.player);
    // this.enemy1 = this.game.add.sprite(10, 10, 'fruit');
    // this.enemy1.scale.setTo(0.03, 0.03);
    // this.game.physics.arcade.enable(this.enemy1);
    // this.enemy1.body.gravity.y = 100;
    this.fruits = this.game.add.group();
    this.fruits.enableBody = true;
    this.game.time.events.loop(100, this.spawnFruits, this);
    this.scoreLabel = this.game.add.text(30, 30, 'score: 0',
    { font: '18px Arial', fill: '#ffffff' });
    console.log(this.game.physics.arcade.overlap);
  }
  update() {
    this.game.physics.arcade.overlap(this.player, this.fruits, this.takeFruit, null, this);
    this.movePlayer();
  }
  movePlayer() {
    const getKeyMapCondition = (key) => this.cursor[key].isDown;
    // 当向左运动时
    if (getKeyMapCondition('left')) {
      if (this.player.x > 25) {
        this.player.x -= 2;
      }
    // 当向右运动时
    } else if (getKeyMapCondition('right')) {
      if (this.player.x < this.screenWidth - 25) {
        this.player.x += 2;
      }
    }
  }
  spawnFruits() {
    const fruits = ['apple', 'banana'];
    const randomFruitIndex = this.game.rnd.integerInRange(0, 1);
    const fruit = this.game.add.sprite(10 + Math.floor(Math.random() * 1000), 0, fruits[randomFruitIndex]);
    this.fruits.add(fruit);
    fruit.scale.setTo(0.02, 0.02);
    this.game.physics.arcade.enable(fruit);
    fruit.body.gravity.y = 500;
    fruit.checkWorldBounds = true;
    fruit.outOfBoundsKill = true;
  }
  takeFruit(player, fruit) {
    fruit.kill();
    this.score += 5;
    this.scoreLabel.text = `score: ${this.score}`;
  }
}

