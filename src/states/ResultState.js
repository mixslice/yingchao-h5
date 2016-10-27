export class ResultState extends Phaser.State {
  init() {
    // add init code
    this.successPoints = 200;
  }
  create() {
    const status = Number(this.game.global.score || 0) >= this.successPoints;
    const backgroundMode = status ? 'gameWin' : 'gameFail';
    const soundMode = status ? 'successSound' : 'failSound';
    const resultSound = this.game.add.audio(soundMode);
    resultSound.play();
    const background = this.game.add.image(0, 0, backgroundMode);
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
  }
}
