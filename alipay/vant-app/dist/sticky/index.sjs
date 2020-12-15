var antmove_export = {};

/* eslint-disable */
function wrapStyle(data) {
  var style = '';

  if (data.transform) {
    style += 'transform: translate3d(0, ' + data.transform + 'px, 0);';
  }

  if (data.fixed) {
    style += 'top: ' + data.offsetTop + 'px;';
  }

  if (data.zIndex) {
    style += 'z-index: ' + data.zIndex + ';';
  }

  return style;
}

function containerStyle(data) {
  var style = '';

  if (data.fixed) {
    style += 'height: ' + data.height + 'px;';
  }

  if (data.zIndex) {
    style += 'z-index: ' + data.zIndex + ';';
  }

  return style;
}

antmove_export = {
  wrapStyle: wrapStyle,
  containerStyle: containerStyle
};
export default antmove_export;