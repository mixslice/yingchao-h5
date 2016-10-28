import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { getQueryStringValue } from 'utils';

polyfill();

const shareAppMessage = (wx, link = '') => {
  wx.onMenuShareAppMessage({
    title: '饿肚就蓝瘦，嘴馋就香菇。我是最强小吃货，快来挑战我~',
    desc: '饿肚就蓝瘦，嘴馋就香菇。我是最强小吃货，快来挑战我~',
    link,
    imgUrl: `${__ASSET_DIR__}/sharePic.jpg`,
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: () => {
    },
    cancel: () => {
    }
  });
};

const shareTimeLine = (wx, link = '') => {
  wx.onMenuShareTimeline({
    title: '饿肚就蓝瘦，嘴馋就香菇。我是最强小吃货，快来挑战我~',
    link,
    imgUrl: `${__ASSET_DIR__}/sharePic.jpg`,
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: () => {
      // alert('success');
    },
    cancel: () => {
      // alert('cancel');
    }
  });
};

export class BootState extends Phaser.State {
  init() {
    const userCode = getQueryStringValue('code') || '';
    // init wechat jssdk
    const currentUrl = location.href.split('#')[0];
    fetch(`${__API_ROOT__}/weixin/jsapi_config/1?url=${currentUrl}`)
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
        shareAppMessage(wx, currentUrl);
        shareTimeLine(wx, currentUrl);
      });
    });
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
        return console.error('get userinfo failed', json.errmsg);
      }
      alert(JSON.stringify(json));
      this.game.global.openId = json.openid;
    });

    // add wechat debug
  }
  preload() {
    this.game.load.crossOrigin = __ASSET_DIR__;
    this.game.load.image('progressBar', `${__ASSET_DIR__}/progressBar.png`);    
    const loadingLabel = this.game.add.text(this.game.width / 2, (this.game.height / 2) - 30, '正在加载...', { font: '30px Arial', fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
    const progressBar = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(progressBar);
    this.game.load.image('home', `${__ASSET_DIR__}/home.png`);
    this.game.load.spritesheet('startButton', `${__ASSET_DIR__}/start.png`);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = __BG_COLOR__;
  }
  create() {
    // add create code
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start('menu');
  }
}
