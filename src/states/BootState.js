import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { getQueryStringValue } from 'utils';

polyfill();

export class BootState extends Phaser.State {
  init() {
    const userCode = getQueryStringValue('code') || '';
    // add data analtics
    fetch(`${__API_ROOT__}/info/statistics/1`);
    this.game.global = {
      userCode,
      score: 0,
      rankData: [],
      openId: '',
    };
    // get code
    fetch(`${__API_ROOT__}/weixin/openid/1?code=${userCode}`)
    .then(response => response.json())
    .then((json) => {
      if (json.errcode) {
        return console.error('upload score failed', json.errmsg);
      }
      this.game.global.openId = json.openId;
    });

    // add wechat debug
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
