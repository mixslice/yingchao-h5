import uuid from 'uuid';

export const getQueryStringValue = (key) =>
decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));

export const getScaleRateX = (rate, width) =>
(width * rate) / 414;

export const getScaleRateY = (rate, height) =>
(height * rate) / 672;

export const getRamdomRequest = (url) => {
  // if (sessionStorage.getItem('assetLoaded')) {
  //   return url;
  // }
  // return `${url}?random=${uuid.v1()}`;
  return `${url}?random=8a2be49a-a1b4-11e6-80f5-76304dec7eb7`;
};

export const getRangeByDifficult = (difficult, initPoints, interval, limit = 300) => {
  const start = initPoints - ((difficult - 1) * interval);
  const end = start - interval;
  return [start > limit ? start : limit, start > limit ? end : limit];
};

export const getWeightByDifficult = (difficult, initPoints, interval, limit = 900) => {
  const start = initPoints + ((difficult - 1) * interval);
  const end = start - interval;
  return [start < limit ? start : limit, start < limit ? end : limit];
};

export const createCss = (fatherElement, cssText, callback) => {
  const father = document[fatherElement] || document.getElementsByTagName(fatherElement)[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = cssText;
  } else {
    style.appendChild(document.createTextNode(cssText));
  }
  style.onload = callback;
  father.appendChild(style);
};


export const setPreloadSprite = (sprite, game) => {
  const progressHeight = sprite.texture.height;
  sprite.rect = new Phaser.Rectangle(0, progressHeight - 1, sprite.width, 1);
  sprite.crop(sprite.rect);
  sprite.visible = true;
    // this.game.load.onLoadStart.add(() => console.log('start'), this);
  game.load.onFileComplete.add((progress) => {
    // console.log('progress', progress, progressHeight);
    const cropHeight = Math.floor((110 / 100) * progress);
    sprite.rect.setTo(0, 110 - cropHeight, sprite.width, cropHeight);
    sprite.updateCrop();
  }, this);
};

export const splitWords = (words = '', max) => {
  if (words.length <= max) {
    return words;
  }
  return `${words.slice(0, max)}...`;
};

const createOauthLink = (link, appid) => 
`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(link)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

export const shareAppMessage = (wx, appid, data = {}) => {
  wx.onMenuShareAppMessage({
    title: `没玩过这个游戏也敢自称吃货！我一口气吃了${data.score}碗，你行吗?`,
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

export const shareTimeLine = (wx, appid, data = {}) => {
  wx.onMenuShareTimeline({
    title: `没玩过这个游戏也敢自称吃货！我一口气吃了${data.score}碗，你行吗?`,
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
