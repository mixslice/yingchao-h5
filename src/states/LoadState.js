export class LoadState extends Phaser.State {
  preload() {
    const loadingLabel = this.game.add.text(this.game.width / 2, (this.game.height / 2) - 30, 'loading...', { font: '30px Arial', fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
    const progressBar = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(progressBar);
    this.game.load.image('playerL', 'assets/tigerLeft.png');
    this.game.load.image('playerR', 'assets/tigerRight.png');
    this.game.load.image('shrimp', 'assets/shrimp.png');
    this.game.load.image('bomb', 'assets/bomb.png');
    this.game.load.image('pepper', 'assets/pepper.png');
    this.game.load.image('shallot', 'assets/shallot.png');
    this.game.load.image('pectinid', 'assets/pectinid.png');
    this.game.load.image('home', 'assets/home.png');
    this.game.load.image('road', 'assets/road.png');
    this.game.load.image('house', 'assets/house.png');
    this.game.load.image('pointsBar', 'assets/pointsBar.png');
    this.game.load.image('backgroundGame', 'assets/backgroundGame.png');
    this.game.load.image('blurGameHome', 'assets/blurGameHome.png');
    this.game.load.image('themeDetail', 'assets/themeDetail.png');
    this.game.load.image('gameRegulation', 'assets/gameRegulation.png');
    this.game.load.image('gameWin', 'assets/gameWin.png');
    this.game.load.image('gameFail', 'assets/gameFail.png');
    this.game.load.image('celebration', 'assets/celebration.png');
    this.game.load.image('rank', 'assets/rank.png');
    this.game.load.audio('successSound', 'assets/success.wav');
    this.game.load.audio('failSound', 'assets/fail.wav');
    this.game.load.audio('background', 'assets/background.mp3');
    this.game.load.spritesheet('arrowButton', 'assets/arrow.png');
    this.game.load.spritesheet('startButton', 'assets/start.png');
  }
  create() {
    this.loadingText = this.game.add.text(this.game.world.centerX,
    this.game.world.height / 2, '正在加载中ing');
    this.loadingText.anchor.setTo(0.5);
    this.game.state.start('menu');
  }
}
