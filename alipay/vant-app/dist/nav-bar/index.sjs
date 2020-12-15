var antmove_export = {};

/* eslint-disable */
function barStyle(data) {
  var styles = [['z-index', data.zIndex], ['padding-top', data.safeAreaInsetTop ? data.statusBarHeight + 'px' : 0]];
  return styles.map(function (item) {
    return item.join(':');
  }).join(';');
}

antmove_export = {
  barStyle: barStyle
};
export default antmove_export;