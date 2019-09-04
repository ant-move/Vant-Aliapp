"use strict";

var utils = require('../../api/utils');

var warnLife = utils.warnLife;

var _require = require('./utils'),
    setIfWatch = _require.setIfWatch;

var getUrl = function getUrl() {
  var pages = getCurrentPages();
  var url = pages[pages.length - 1].route;

  var _arr = url.split('/');

  var _name = _arr[_arr.length - 1];
  my.setStorageSync({
    key: '_pageMsg',
    data: {
      pageName: _name,
      pagePath: url
    }
  });
};

module.exports = {
  processTransformationApp: function processTransformationApp(_opts, options) {
    _opts = Object.assign(_opts, options);

    _opts.onLaunch = function (res) {
      my.clearStorageSync({
        key: "logInfo"
      });
      my.clearStorageSync({
        key: "_pageMsg"
      });
      getUrl();
      var body = {};

      function pre() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return utils.defineGetter(params, body.params, function (obj, prop) {
          warnLife("onLaunch's return value is not support ".concat(prop, " attribute!"), "onLaunch/".concat(prop));
        });
      }

      if (options.onLaunch) {
        body = {
          params: {
            scene: {
              type: 0,
              desc: "missing"
            },
            shareTicket: {
              type: 0,
              desc: "missing"
            }
          }
        };
        res = pre(res);

        if (typeof options.data === 'function') {
          options.data = options.data();
        }

        options.onLaunch.call(this, res);
      }

      if (options.onPageNotFound) {
        warnLife("There is no onPageNotFound life cycle", "onPageNotFound");
      }

      if (options.onPageNotFound) {
        warnLife("There is no onPageNotFound life cycle", "onPageNotFound");
      }
    };

    _opts.onShow = function (res) {
      setIfWatch(true);
      var body = {};

      function pre() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return utils.defineGetter(params, body.params, function (obj, prop) {
          warnLife("onShow's return value is not support ".concat(prop, " attribute!"), "onShow/".concat(prop));
        });
      }

      if (options.onShow) {
        body = {
          params: {
            scene: {
              type: 0,
              desc: "missing"
            },
            shareTicket: {
              type: 0,
              desc: "missing"
            }
          }
        };
        res = pre(res);
        options.onShow.call(this, res);
      }
    };

    _opts.onHide = function () {
      setIfWatch(false);

      if (options.onHide) {
        warnLife('', 'app/onHide');
        options.onHide.call(this);
      }
    };

    if (options.onError) {
      _opts.onError = function () {
        options.onError.call(this);
      };
    }
  }
};