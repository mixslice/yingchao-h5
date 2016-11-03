import 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
import { getQueryStringValue, getRamdomRequest, getScaleRateY } from 'utils';

polyfill();

const createOauthLink = (link, appid) => 
`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(link)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

const shareAppMessage = (wx, appid, data = {}) => {
  wx.onMenuShareAppMessage({
    title: `没玩过这个游戏也敢自称吃货！我一口气吃了${data.beated}碗，你行吗?`,
    desc: '我是最强小吃货，快来挑战我',
    link: createOauthLink('http://ujoy.ramytech.com/sause-rank/', appid),
    imgUrl: `${__ASSET_DIR__}/sharePic.jpg`,
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: () => {
    },
    cancel: () => {
    }
  });
};

const shareTimeLine = (wx, appid, data = {}) => {
  wx.onMenuShareTimeline({
    title: `没玩过这个游戏也敢自称吃货！我一口气吃了${data.beated}碗，你行吗?`,
    link: createOauthLink('http://ujoy.ramytech.com/sause-rank/', appid),
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
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.refresh();
    this.game.global = {
      score: 0,
      rankData: [],
      openId: '',
      beated: '80%',
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
