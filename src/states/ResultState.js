export class ResultState extends Phaser.State {
  init() {
    // add init code
    this.successPoints = 2;
    this.status = Number(this.game.global.score || 0) >= this.successPoints;    
  }
  create() {
    const backgroundMode = this.status ? 'gameWin' : 'gameFail';
    const soundMode = this.status ? 'successSound' : 'failSound';
    const resultSound = this.game.add.audio(soundMode);
    resultSound.play();
    const background = this.game.add.image(0, 0, backgroundMode);
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
    if (this.status) {
      const randomDelay = this.game.rnd.integerInRange(200, 300);
      this.game.time.events.loop(randomDelay, this.animation, this);
    }
    this.game.time.events.add(2000, this.goToRank, this);
  }
  animation() {
    if (this.celebration) {
      this.celebration.kill();
    }
    const randomPosition = this.game.rnd.integerInRange(-this.game.width, this.game.width);
    this.celebration = this.game.add.sprite(randomPosition, 0, 'celebration');
  }
  goToRank() {
    this.game.state.start('rank');
  }
}
