export class LoadState extends Phaser.State {
  preload() {
    this.game.load.image('player', 'assets/fruit.png');
    this.game.load.image('banana', 'assets/banana.png');
    this.game.load.image('apple', 'assets/fruit.png');
    this.game.load.spritesheet('startButton', 'assets/banana.png');
  }
  create() {
    this.loadingText = this.game.add.text(this.game.world.centerX, this.game.world.height / 2, '正在加载中ing');
    this.loadingText.anchor.setTo(0.5);
    this.game.state.start('menu');
  }
}
