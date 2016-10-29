import uuid from 'uuid';

export const getQueryStringValue = (key) =>
decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));

export const getScaleRateX = (rate, width) =>
(width * rate) / 414;

export const getScaleRateY = (rate, height) =>
(height * rate) / 736;

export const getRamdomRequest = (url) => {
  if (sessionStorage.getItem('assetLoaded')) {
    return url;
  }
  return `${url}?random=${uuid.v1()}`;
};


