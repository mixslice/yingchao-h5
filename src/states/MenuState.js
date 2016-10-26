export class MenuState extends Phaser.State {
  create() {
    const titleLabel = this.game.add.text(this.game.width / 2, 80,
            '英潮', { font: '50px Arial', fill: '#ffffff' });
    titleLabel.anchor.setTo(0.5, 0.5);
    const startLabel = this.game.add.text(this.game.width / 2, this.game.height - 80,
            '开始游戏', { font: '25px Arial', fill: '#ffffff' });
    startLabel.anchor.setTo(0.5, 0.5);
    const upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.start, this);
    const button = this.game.add.button(this.game.world.centerX - 105, 200, 'startButton', this.start, this, 0.01, 1, 0);
    button.scale.setTo(0.05, 0.05);
  }
  start() {
    this.game.state.start('play');
  }
}
