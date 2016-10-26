export class PreloadState extends Phaser.State {
  init() {
    // add init code
    console.log('init', this.game);
    this.game.stage.backgroundColor = __BG_COLOR__;
  }
  create() {
    // add create code
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start('load');
  }
}
