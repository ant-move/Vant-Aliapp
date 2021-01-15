"use strict";

var times = 0;
var lastTime = 0;

var getLogInfo = function getLogInfo() {
  var num = 0;
  var info = my.getStorageSync({
    key: '__antmove_loginfo'
  }).data;

  if (info === null) {
    return false;
  }

  info = info.pages;
  info.forEach(function (v) {
    num += v.logs.length;
  });
  return num;
};

function getNewData() {
  if (!lastTime) {
    lastTime = new Date().getTime();
    times = 1;
  } else {
    var thisTime = new Date().getTime();
    times += 1;

    if (thisTime - lastTime > 1000 || times > 3) {
      times = 1;
    }

    lastTime = thisTime;
  }
}

var watchShakes = function watchShakes() {
  var pages = getCurrentPages();
  var url = pages[pages.length - 1].route;
  var logUrl = 'pages/ant-move-runtime-logs/index';
  var specificUrl = 'pages/ant-move-runtime-logs/specific/index';
  my.watchShake({
    success: function success() {
      var num = getLogInfo();
      var ifWatch = my.getStorageSync({
        key: 'ifWatch'
      }).data;
      getNewData();

      if (times !== 3 || !ifWatch || url === logUrl || url === specificUrl || !num) {
        watchShakes();
        return false;
      }

      my.confirm({
        title: '温馨提示',
        content: "\u5DF2\u6536\u96C6\u4E86".concat(num, "\u6761\u95EE\u9898\u65E5\u5FD7\uFF0C\u662F\u5426\u67E5\u770B?  (\u8BE5\u5F39\u7A97\u548C\u95EE\u9898\u6536\u96C6\u9875\u9762\u7684\u4EE3\u7801\u7531Antmove\u5D4C\u5165\uFF0C\u4E0A\u7EBF\u65F6\u8BF7\u8BB0\u5F97\u53BB\u6389)"),
        confirmButtonText: '赶紧看看',
        cancelButtonText: '暂不需要',
        success: function success(res) {
          if (res.confirm) {
            my.navigateTo({
              url: '/pages/ant-move-runtime-logs/index'
            });
          }
        },
        complete: function complete() {
          watchShakes();
        }
      });
    }
  });
};

module.exports = watchShakes;