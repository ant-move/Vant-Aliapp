"use strict";

var config = require('./config.js');

var env = config.env === 'production' ? 'prod' : 'dev'; // prod, 生产环境不输出

var oldUrl = [];
var flag = false;
module.exports = {
  info: function info() {},
  // 生命周期报错警告记录函数

  /**
     * msg 为发出的警告信息
     * lifeName 为发出警告的生命周期名字
     * **/
  warnLife: function warnLife(msg, lifeName) {
    if (env === 'prod') {
      return false;
    }

    var _flag = true;
    var rs = my.getStorageSync({
      key: '_pageMsg'
    });

    if (lifeName === 'app/onHide') {
      flag = true;
      return;
    }

    if (flag) {
      for (var i = 0; i < oldUrl.length; i++) {
        if (oldUrl[i] === rs.data.pagePath) {
          _flag = false;
          break;
        }
      }
    }

    if (!_flag) {
      return;
    } else {
      oldUrl.push(rs.data.pagePath);
    }

    var logInfo = {
      appName: '',
      appVersion: '',
      pages: []
    };
    var page = {
      pageName: '',
      path: '',
      open: false,
      logs: []
    };
    var log = {
      type: '',
      errorType: '',
      name: '',
      message: '',
      custom: ''
    };
    var p = false;
    var l = false;
    var a = -1;
    var res = my.getStorageSync({
      key: '__antmove_loginfo'
    });

    if (res.data !== null) {
      logInfo = res.data;
    }

    page.pageName = rs.data.pageName;
    page.path = rs.data.pagePath;
    log.type = 'life';
    log.name = lifeName;
    log.message = msg;

    if (res.data !== null) {
      for (var _i = 0; _i < res.data.pages.length; _i++) {
        if (rs.data.pagePath === res.data.pages[_i].path) {
          p = true;
          a = _i;

          for (var j = 0; j < res.data.pages[_i].logs.length; j++) {
            if (lifeName === res.data.pages[_i].logs[j].name) {
              l = true;

              if (l) {
                break;
              }
            }
          }
        }
      }

      if (p && !l) {
        logInfo.pages[a].logs.push(log);
      }

      if (!p && !l) {
        page.logs.push(log);
        logInfo.pages.push(page);
      }
    } else {
      page.logs.push(log);
      logInfo.pages.push(page);
    }

    my.setStorageSync({
      key: '__antmove_loginfo',
      data: logInfo
    });
    console.warn(msg);
  },

  /**
    *  warn 为api报警的就函数
    *  _desc = {
    *      apiName: 报警的api的名字
    *      errorType: 报警的api警告等级
    *      type： 警告描述
    * }
    *  errorType等级分为:
    *  0 - missing - 不支持该属性
    *  1 - diff - 命名及格式不同
    *  3 - diffType - 类型不同
    *  4 - defaultValue - 默认值不同
    * 5 - wrapComponent - 使用自定义组件代替
    * 6 - diff tagName
    * 7 - equal - 完全支持
    */
  warn: function warn(msg) {
    var _desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      apiName: '',
      errorType: '',
      type: ''
    };

    if (env === 'prod') {
      return false;
    }

    var logInfo = {
      appName: '',
      appVersion: '',
      pages: []
    };
    var page = {
      pageName: '',
      path: '',
      open: '',
      logs: []
    };
    var log = {
      type: '',
      errorType: '',
      name: '',
      message: '',
      custom: ''
    };
    var res = my.getStorageSync({
      key: '__antmove_loginfo'
    });

    if (res.data !== null) {
      logInfo = res.data;
    }

    var rs = my.getStorageSync({
      key: '_pageMsg'
    });

    if (!rs || !rs.data) {
      return;
    }

    page.pageName = rs.data.pageName;
    page.path = rs.data.pagePath;
    log.type = _desc.type;
    log.name = _desc.apiName;
    log.message = msg;
    log.errorType = _desc.errorType;

    if (!_desc.errorType && _desc.errorType !== 0) {
      log.custom = 'No missing attribute';
    } else if (_desc.errorType === 0) {
      log.custom = '不支持该属性';
    } else if (_desc.errorType === 1) {
      log.custom = '命名及格式不同';
    } else if (_desc.errorType === 2) {
      log.custom = '类型不同';
    } else if (_desc.errorType === 3) {
      log.custom = '默认值不同';
    }

    var p = false;
    var l = false;
    var a = -1;

    if (res.data !== null) {
      for (var i = 0; i < res.data.pages.length; i++) {
        if (rs.data.pagePath === res.data.pages[i].path) {
          p = true;
          a = i;

          for (var j = 0; j < res.data.pages[i].logs.length; j++) {
            if (_desc.apiName === res.data.pages[i].logs[j].name) {
              l = true;

              if (l) {
                break;
              }
            }
          }
        }
      }

      if (p && !l) {
        logInfo.pages[a].logs.push(log);
      }

      if (!p && !l) {
        page.logs.push(log);
        logInfo.pages.push(page);
      }
    } else {
      page.logs.push(log);
      logInfo.pages.push(page);
    }

    my.setStorageSync({
      key: '__antmove_loginfo',
      data: logInfo
    });
    console.warn(msg);
  },
  error: function error() {}
};