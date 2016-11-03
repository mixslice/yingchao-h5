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
