export class PlayState extends Phaser.State {
  init() {
    // add init code
    this.screenWidth = this.game.width;
    this.screenHeight = this.game.height;
    this.difficult = 10;
    console.log(this.game.global);
    this.game.global = { score: 0 };
    this.passScore = 200;
  }
  create() {
    // music goes
    this.backgroundMusic = this.game.add.audio('background');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.play();
    this.backgroundMusic.fadeIn('0.5');
    this.backgroundMusic.fadeOut('0.5');
    // create world
    const background = this.game.add.image(0, 0, 'backgroundGame');
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
    const road = this.game.add.image(0, this.game.height, 'road');
    road.anchor.setTo(0, 1);
    const roadScaleRate = this.game.width / road.texture.width;
    const pointsBar = this.game.add.image(this.game.width - 10, 20, 'pointsBar');
    pointsBar.anchor.setTo(1, 0);
    pointsBar.scale.setTo(0.5, 0.5);
    this.scoreLabel = this.game.add.text(pointsBar.x - 10, pointsBar.y + 13, '0',
    { font: '18px Arial', fill: '#ffffff' });
    this.scoreLabel.anchor.setTo(1, 0);
    // road.anchor.setTo(0.5, 0.5);
    road.scale.setTo(roadScaleRate, roadScaleRate);
    const house = this.game.add.image(0, this.game.height - (road.texture.height * roadScaleRate), 'house');
    const houseScaleRate = this.game.width / house.texture.width;
    house.anchor.setTo(0, 1);
    house.scale.setTo(houseScaleRate, houseScaleRate);
    // create sprites
    this.cursor = this.game.input.keyboard.createCursorKeys();
    this.pointer = this.game.input.addPointer();
    // create a player
    this.player = this.game.add.sprite(this.game.world.centerX, this.screenHeight - 100, 'playerR');
    this.player.anchor.setTo(0.5, 0.5);
    this.player.scale.setTo(0.5, 0.5);
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
    // random generate fruits
    const randomDelayFruits = this.game.rnd.integerInRange(80, 150);
    const randomDelayEnemies = this.game.rnd.integerInRange(200, 300);
    this.game.time.events.loop(randomDelayFruits, this.spawnFruits, this);
    this.game.time.events.loop(randomDelayEnemies, this.spawnEnemies, this);

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
  render() {
    // for debug
    // this.game.debug.inputInfo(30, 240);
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
    const randomWeight = this.game.rnd.integerInRange(500, 600);
    
    const entity = Object.keys(fruitsMapWithWeight)[randomFruitIndex];
    const fruit = this.game.add.sprite(10 + Math.floor(Math.random() * 1000), 0, entity);
    this.fruits.add(fruit);
    fruit.anchor.setTo(0.5, 0.5);
    fruit.scale.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(fruit);
    fruit.body.gravity.y = randomWeight;
    fruit.checkWorldBounds = true;
    fruit.outOfBoundsKill = true;
    fruit.data.points = fruitsMapWithWeight[entity];
  }

  spawnEnemies() {
    const randomWeight = this.game.rnd.integerInRange(600, 700);
    const enemy = this.game.add.sprite(10 + Math.floor(Math.random() * 1000), 0, 'bomb');
    this.enemies.add(enemy);
    enemy.scale.setTo(0.5, 0.5);
    enemy.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(enemy);
    enemy.body.gravity.y = randomWeight;
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
  }

  takeFruit(player, fruit) {
    const playerPositon = player.body.position;
    const fruitPosition = fruit.position;
    // console.log(player, fruit);
    fruit.kill();
    this.game.global.score += fruit.data.points;
    this.scoreLabel.text = this.game.global.score;
    // if (fruitPosition.x > playerPositon.x + player.body.halfWidth
    // && fruitPosition.y < playerPositon.y + 20) {
    //   fruit.kill();
    //   this.score += fruit.data.points;
    //   this.scoreLabel.text = `score: ${this.score}`;
    // }
  }
  takeBomb(player, bomb) {
    // end the background music
    this.backgroundMusic.stop();
    console.log('play music');
    this.game.state.start('result');
  }
}
