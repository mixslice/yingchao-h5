export class BootState extends Phaser.State {
  init() {
    // add init code
  }
  preload() {
    this.game.load.image('progressBar', 'assets/progressBar.png');
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = __BG_COLOR__;
  }
  create() {
    // add create code
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start('load');
  }
}
