import { getScaleRateX } from 'utils';

export class RegulationState extends Phaser.State {
  init() {
    // add init code
    this.buttonOffset1X = getScaleRateX(20, this.game.width);
    this.halfScaleX = getScaleRateX(0.5, this.game.width);
    this.touchPos = 0;
  }
  create() {
    // create init scene
    const background = this.game.add.image(0, 0, 'blurGameHome');
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
    this.themeDetail = this.game.add.image(this.game.width / 2, this.game.height / 2, 'themeDetail');
    const scaleRate = (this.game.width - this.buttonOffset1X) / background.texture.width;
    this.themeDetail.scale.setTo(scaleRate, scaleRate);
    this.themeDetail.anchor.setTo(0.5, 0.5);
    this.arrowButton = this.game.add.button(this.game.width - this.buttonOffset1X, this.game.world.height / 2, 'arrowButton', this.nextPage, this, 0.01, 1, 0);
    this.arrowButton.anchor.setTo(1, 0.5);
    this.arrowButton.scale.setTo(this.halfScaleX, this.halfScaleX);
    this.game.input.onDown.add(this.touchDownHandler, this);
    this.game.input.onUp.add(this.touchUpHandler, this);
  }
  touchDownHandler(pointer, touch) {
    this.touchPos = touch.clientX;
  }
  touchUpHandler(pointer, touch) {
    if (this.touchPos !== 0 && this.touchPos - touch.clientX > 20) {
      this.touchPos = 0;
      this.nextPage();
    }
  }
  nextPage() {
    this.themeDetail.loadTexture('gameRegulation');
    this.arrowButton.kill();
    const startButton = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'startButton', this.startGame, this, 0.01, 1, 0);
    startButton.anchor.setTo(0.5, 0.5);
    startButton.scale.setTo(window.devicePixelRatio / 2, window.devicePixelRatio / 2);
  }
  startGame() {
    this.game.state.start('play');
  }
}
