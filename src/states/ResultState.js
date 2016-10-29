import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

polyfill();

export class ResultState extends Phaser.State {
  init() {
    // add init code
    this.passScore = 200;
    this.status = Number(this.game.global.score || 0) >= this.passScore;
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
    // post score and get game data
    const scoreFormData = new FormData();
    scoreFormData.append('score', this.game.global.score);
    fetch(`${__API_ROOT__}/game/rank/record/1?openid=${this.game.global.openId || 'test_123'}`, {
      method: 'POST',
      body: scoreFormData,
    })
    .then(response => response.json())
    .then((json) => {
      if (json.errcode) {
        return console.error('upload score failed');
      }
      return null;
    })
    .then(() => fetch(`${__API_ROOT__}/game/rank/1`))
    .then(response => response.json())  
    .then((json) => {
      if (json.errcode) {
        return console.error('upload score failed');
      }
      this.game.global.rankData = json || {};
      return this.game.state.start('rank');
    })
    .catch(e => console.log('upload failed', e));
  }
}
