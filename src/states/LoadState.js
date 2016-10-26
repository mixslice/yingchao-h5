export class LoadState extends Phaser.State {
  preload() {
    this.loadingText = this.game.add.text(this.game.world.centerX, this.game.world.height / 2, '正在加载中ing');
    this.loadingText.anchor.setTo(0.5);
  }
  create() {
    this.game.state.start('main');
  }
}
