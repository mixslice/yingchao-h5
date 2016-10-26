export class PlayState extends Phaser.State {
  init() {
    // add init code
    this.screenWidth = this.game.width;
    this.screenHeight = this.game.height;
    this.difficult = 10;
    this.score = 0;
  }
  create() {
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.pointer = this.game.input.addPointer();
    // create a player
    this.player = this.game.add.sprite(30, this.screenHeight - 100, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(0.05, 0.05);
    // add drag event in item
    this.player.inputEnabled = true;
    this.player.input.enableDrag(true);
    this.player.events.onDragUpdate.add(this.onDragFixY);

    this.game.physics.arcade.enable(this.player);
    this.fruits = this.game.add.group();
    this.fruits.enableBody = true;
    this.game.time.events.loop(100, this.spawnFruits, this);
    this.scoreLabel = this.game.add.text(30, 30, 'score: 0',
    { font: '18px Arial', fill: '#ffffff' });
  }
  update() {
    this.game.physics.arcade.overlap(this.player, this.fruits, this.takeFruit, null, this);
    this.movePlayerByKeys();
  }
  render() {
    // for debug
    // this.game.debug.inputInfo(30, 240);
  }
  onDragFixY(item) {
    if (item.previousPosition.y !== item.y) {
      item.y = item.previousPosition.y;
    }
    if (item.previousPosition.x < item.x) {
      item.loadTexture('player');
    } else if (item.previousPosition.x > item.x) {
      item.loadTexture('banana');
    }
  }
  movePlayerByKeys() {
    const getKeyMapCondition = (key) => this.cursor[key].isDown;
    // 当向左运动时
    if (getKeyMapCondition('left')) {
      // change the pic
      this.player.loadTexture('banana');
      if (this.player.x > 25) {
        this.player.x -= 2;
      }
    // 当向右运动时
    } else if (getKeyMapCondition('right')) {
      this.player.loadTexture('player');
      if (this.player.x < this.screenWidth - 25) {
        this.player.x += 2;
      }
    }
  }
  spawnFruits() {
    const fruitsMapWithWeight = {
      banana: 5,
      apple: 10,
    };

    const randomFruitIndex = this.game.rnd.integerInRange(0, 1);
    const entity = Object.keys(fruitsMapWithWeight)[randomFruitIndex];
    const fruit = this.game.add.sprite(10 + Math.floor(Math.random() * 1000), 0, entity);
    this.fruits.add(fruit);
    fruit.scale.setTo(0.02, 0.02);
    fruit.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(fruit);
    fruit.body.gravity.y = 500;
    fruit.checkWorldBounds = true;
    fruit.outOfBoundsKill = true;
    fruit.data.points = fruitsMapWithWeight[entity];
  }
  takeFruit(player, fruit) {
    const playerPositon = player.body.position;
    const fruitPosition = fruit.position;
    fruit.kill();
    this.score += fruit.data.points;
    this.scoreLabel.text = `score: ${this.score}`;
    // if (fruitPosition.x > playerPositon.x + player.body.halfWidth) {}
  }
}

