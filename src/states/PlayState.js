import { getScaleRateX, getScaleRateY, getRangeByDifficult } from 'utils';


export class PlayState extends Phaser.State {
  init() {
    // add init code
    this.screenWidth = this.game.width;
    this.screenHeight = this.game.height;
    this.difficult = 1;
    this.halfScaleX = getScaleRateX(0.5, this.game.width);
    this.textOffset1Y = getScaleRateY(10, this.game.height);
    this.textOffset2Y = getScaleRateY(21, this.game.height);

    this.score = 0;
  }
  create() {
    // music goes
    this.backgroundMusic = this.game.add.audio('background');
    this.explodeMusic = this.game.add.audio('explode');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.play();
    // create world
    const background = this.game.add.image(0, 0, 'backgroundGame');
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
    this.road = this.game.add.image(0, this.game.height, 'road');
    const roadScaleRate = this.game.width / this.road.texture.width;
    this.road.scale.setTo(roadScaleRate, roadScaleRate);
    this.road.anchor.setTo(0, 1);
    const pointsBar = this.game.add.image(this.game.width - this.textOffset1Y, 20, 'pointsBar');
    pointsBar.anchor.setTo(1, 0);
    pointsBar.scale.setTo(this.halfScaleX, this.halfScaleX);
    this.scoreLabel = this.game.add.text(pointsBar.x - this.textOffset1Y, pointsBar.y + getScaleRateY(13, this.game.height), '0',
    { font: `${getScaleRateX(18, this.game.width)}px DFPHaiBaoW12`, fill: '#ffffff' });
    this.scoreLabel.setShadow(0, getScaleRateY(3, this.game.height), 'rgba(137,64,0,0.75)', 0);
    this.scoreLabel.stroke = '#894000';
    this.scoreLabel.strokeThickness = 7;
    this.scoreLabel.anchor.setTo(1, 0.3);
    // road.anchor.setTo(0.5, 0.5);
    const house = this.game.add.image(0, this.game.height - (this.road.texture.height * roadScaleRate) + this.textOffset2Y, 'house');
    const houseScaleRate = this.game.width / house.texture.width;
    house.anchor.setTo(0, 1);
    house.scale.setTo(houseScaleRate, houseScaleRate);
    // create sprites
    this.cursor = this.game.input.keyboard.createCursorKeys();
    // create a player
    this.player = this.game.add.sprite(this.game.world.centerX, this.road.y - (this.road.texture.height * roadScaleRate) / 2, 'playerR');
    this.player.anchor.setTo(0.5, 1);
    this.player.scale.setTo(this.halfScaleX, this.halfScaleX);
    // this.player.body.setSize(this.player.texture.width * this.halfScaleX - 10, this.player.texture.width * this.halfScaleX -10);
    // add drag event in item
    this.player.inputEnabled = true;
    this.player.input.enableDrag(true);
    this.player.events.onDragUpdate.add(this.onDragFixY);
    this.game.physics.arcade.enable(this.player);
    // add fruits
    this.fruits = this.game.add.group();
    this.fruits.enableBody = true;
    // add enemies
    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;
    // add emitter
    this.emitter = this.game.add.emitter(0, 0, 100);
    this.emitter.makeParticles('pixel');
    this.emitter.setYSpeed(-150, 150);
    this.emitter.setXSpeed(-150, 150);
    this.emitter.setScale(2, 0, 2, 0, 800);
    this.emitter.gravity = 0;
    // random generate fruits
    const randomDelayFruits = this.game.rnd.integerInRange(...getRangeByDifficult(this.difficult, 600, 20, 130));

    const randomDelayEnemies = this.game.rnd.integerInRange(...getRangeByDifficult(this.difficult, 1700, 240));
    this.generateFruits = this.game.time.events.loop(randomDelayFruits, this.spawnFruits, this);
    this.generateEnemies = this.game.time.events.loop(randomDelayEnemies, this.spawnEnemies, this);
    this.game.time.events.loop(5000, this.addDifficult, this);
    // random generate enemies (todo)
  }
  update() {
    // add points get fruit
    this.game.physics.arcade.overlap(this.player, this.fruits, this.takeFruit, null, this);
    // add die func
    this.game.physics.arcade.overlap(this.player, this.enemies, this.takeBomb, null, this);

    // add key listener
    this.movePlayerByKeys();
  }
  // render() {
  //   // for debug
  //   this.game.debug.text('当前时间: ' + this.game.time.totalElapsedSeconds(), 32, 32);
  // }
  addDifficult() {
    this.difficult += 1;
    const randomDelayEnemies = this.game.rnd.integerInRange(...getRangeByDifficult(this.difficult, 1000, 50));
    const randomDelayFruits = this.game.rnd.integerInRange(...getRangeByDifficult(this.difficult, 450, 50, 130));

    this.game.time.events.remove(this.generateEnemies);
    this.generateEnemies = this.game.time.events.loop(randomDelayEnemies, this.spawnEnemies, this);
    this.game.time.events.remove(this.generateFruits);
    this.generateFruits = this.game.time.events.loop(randomDelayFruits, this.spawnFruits, this);
  }
  onDragFixY(item) {
    if (item.previousPosition.y !== item.y) {
      item.y = item.previousPosition.y;
    }
    if (item.previousPosition.x < item.x) {
      item.loadTexture('playerR');
    } else if (item.previousPosition.x > item.x) {
      item.loadTexture('playerL');
    }
    if (item.x >= item.game.world.width - item.body.halfWidth) {
      item.x = item.game.world.width - item.body.halfWidth;
    }
    if (item.x <= item.body.halfWidth) {
      item.x = item.body.halfWidth;
    }
  }
  movePlayerByKeys() {
    const getKeyMapCondition = key => this.cursor[key].isDown;
    // 当向左运动时
    if (getKeyMapCondition('left')) {
      // change the pic
      this.player.loadTexture('playerL');
      if (this.player.x > 25) {
        this.player.x -= 2;
      }
    // 当向右运动时
    } else if (getKeyMapCondition('right')) {
      this.player.loadTexture('playerR');
      if (this.player.x < this.screenWidth - 25) {
        this.player.x += 2;
      }
    }
  }
  spawnFruits() {
    const fruitsMapWithWeight = {
      shrimp: 10,
      pepper: 20,
      pectinid: 20,
      shallot: 10,
    };

    const randomFruitIndex = this.game.rnd.integerInRange(0, 3);
    const randomWeight = this.game.rnd.integerInRange(400, 600);
    
    const entity = Object.keys(fruitsMapWithWeight)[randomFruitIndex];
    const fruit = this.game.add.sprite(10 + Math.floor(Math.random() * 1000), 0, entity);
    this.fruits.add(fruit);
    fruit.anchor.setTo(0.5, 0.5);
    fruit.scale.setTo(this.halfScaleX, this.halfScaleX);
    this.game.physics.arcade.enable(fruit);
    fruit.body.gravity.y = randomWeight;
    fruit.checkWorldBounds = true;
    fruit.outOfBoundsKill = true;
    fruit.data.points = fruitsMapWithWeight[entity];
  }

  spawnEnemies() {
    const randomWeight = this.game.rnd.integerInRange(400, 600);
    const enemy = this.game.add.sprite(10 + Math.floor(Math.random() * 1000), 0, 'bomb');
    this.enemies.add(enemy);
    enemy.scale.setTo(this.halfScaleX, this.halfScaleX);
    enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = randomWeight;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
  }

  takeFruit(player, fruit) {
    fruit.kill();
    this.emitter.x = fruit.x;
    this.emitter.y = fruit.y - ((fruit.texture.height * this.halfScaleX) / 2);
    this.emitter.start(true, 50, null, 23);
    this.score += fruit.data.points;
    this.scoreLabel.text = this.score;
  }
  takeBomb(player, enemy) {
    const enemyPosition = enemy.position;
    if (enemyPosition.y < player.y - (player.texture.height * this.halfScaleX) / 2) {
      player.input.enableDrag(false);
      this.emitter.x = player.x;
      this.emitter.y = player.y - (player.texture.height * this.halfScaleX);
      this.emitter.start(true, 300, null, 40);
      enemy.kill();
      this.explodeMusic.play();
      this.game.global.score = this.score;
      this.backgroundMusic.stop();
      this.game.time.events.add(500, this.startResult, this);
    }
  }
  startResult() {
    this.game.state.start('result');
  }
}
