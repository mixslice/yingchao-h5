export class ResultState extends Phaser.State {
  init() {
    // add init code
    this.successPoints = 1;
  }
  create() {
    const mode = Number(this.game.global.score || 0) >= this.successPoints ? 'gameWin' : 'gameFail';
    const background = this.game.add.image(0, 0, mode);
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
  }
}
