import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { getQueryStringValue,
  getRamdomRequest,
  getScaleRateY,
  shareAppMessage,
  shareTimeLine,
  } from 'utils';

polyfill();


export class BootState extends Phaser.State {
  init() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();
    this.game.global = {
      score: 0,
      rankData: [],
      openId: '',
      beated: '80%',
      appid: '',
    };
    const userCode = getQueryStringValue('code') || '';
    // init wechat jssdk
    const currentUrl = location.href.split('#')[0];
    fetch(`${__API_ROOT__}/weixin/jsapi_config/2?url=${encodeURIComponent(currentUrl)}`)
    .then(response => response.json())
    .then((json) => {
      if (json.errcode) {
        return console.error('get jsspi failed', json.errmsg);
      }
      wx.config({
        debug: false,
        appId: json.appid,
        timestamp: json.timestamp,
        nonceStr: json.noncestr,
        signature: json.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'],
      });
      wx.ready(() => {
        shareAppMessage(wx, json.appid, this.game.global);
        shareTimeLine(wx, json.appid, this.game.global);
      });
      this.game.global.appid = json.appid;
    });
    // add data analtics
    fetch(`${__API_ROOT__}/info/statistics/1`);

    this.game.global.userCode = userCode;
    // get userinfo by code
    fetch(`${__API_ROOT__}/weixin/profile/2/code?code=${userCode}`)
    .then(response => response.json())
    .then((json) => {
      if (json.errcode) {
        return console.error('get userinfo failed', json.errmsg);
      }
      this.game.global.openId = json.user_id;
    });

    // add wechat debug
  }
  preload() {
    this.textOffsetY = getScaleRateY(30, this.game.height);
    this.game.load.crossOrigin = __ASSET_DIR__;
    const loadingLabel = this.game.add.text(this.game.width / 2, (this.game.height / 2) - this.textOffsetY, '正在加载中...', { font: `${this.textOffsetY}px DFPHaiBaoW12`, fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
    this.game.load.image('home', getRamdomRequest(`${__ASSET_DIR__}/home.png`));
    this.game.load.spritesheet('startButton', getRamdomRequest(`${__ASSET_DIR__}/start.png`));
    this.game.load.image('loadingEmpty', getRamdomRequest(`${__ASSET_DIR__}/loadingEmpty.png`));
    this.game.load.image('loadingFull', getRamdomRequest(`${__ASSET_DIR__}/loadingFull.png`));

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = __BG_COLOR__;
  }
  create() {
    // add create code
    this.game.state.start('menu');
  }
}
