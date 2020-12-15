var antmove_export = {};

/* eslint-disable */
var PRESET_ICONS = ['qq', 'weibo', 'wechat', 'link', 'qrcode', 'poster'];

function getIconURL(icon) {
  if (PRESET_ICONS.indexOf(icon) !== -1) {
    return 'https://img.yzcdn.cn/vant/share-icon-' + icon + '.png';
  }

  return icon;
}

antmove_export = {
  getIconURL: getIconURL
};
export default antmove_export;