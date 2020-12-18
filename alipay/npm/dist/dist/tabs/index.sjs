var antmove_export = {};
import antmove_1_module from '../wxs/utils.sjs';
import antmove_2_module from '../wxs/style.sjs';

/* eslint-disable */
var utils = antmove_1_module;
var style = antmove_2_module;

function tabClass(active, ellipsis) {
  var classes = ['tab-class'];

  if (active) {
    classes.push('tab-active-class');
  }

  if (ellipsis) {
    classes.push('van-ellipsis');
  }

  return classes.join(' ');
}

function tabStyle(data) {
  var titleColor = data.active ? data.titleActiveColor : data.titleInactiveColor;
  var ellipsis = data.scrollable && data.ellipsis; // card theme color

  if (data.type === 'card') {
    return style({
      'border-color': data.color,
      'background-color': !data.disabled && data.active ? data.color : null,
      color: titleColor || (!data.disabled && !data.active ? data.color : null),
      'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null
    });
  }

  return style({
    color: titleColor,
    'flex-basis': ellipsis ? 88 / data.swipeThreshold + '%' : null
  });
}

function navStyle(color, type) {
  return style({
    'border-color': type === 'card' && color ? color : null
  });
}

function trackStyle(data) {
  if (!data.animated) {
    return '';
  }

  return style({
    left: -100 * data.currentIndex + '%',
    'transition-duration': data.duration + 's',
    '-webkit-transition-duration': data.duration + 's'
  });
}

function lineStyle(data) {
  return style({
    width: utils.addUnit(data.lineWidth),
    transform: 'translateX(' + data.lineOffsetLeft + 'px)',
    '-webkit-transform': 'translateX(' + data.lineOffsetLeft + 'px)',
    'background-color': data.color,
    height: data.lineHeight !== -1 ? utils.addUnit(data.lineHeight) : null,
    'border-radius': data.lineHeight !== -1 ? utils.addUnit(data.lineHeight) : null,
    'transition-duration': !data.skipTransition ? data.duration + 's' : null,
    '-webkit-transition-duration': !data.skipTransition ? data.duration + 's' : null
  });
}

antmove_export = {
  tabClass: tabClass,
  tabStyle: tabStyle,
  trackStyle: trackStyle,
  lineStyle: lineStyle,
  navStyle: navStyle
};
export default antmove_export;