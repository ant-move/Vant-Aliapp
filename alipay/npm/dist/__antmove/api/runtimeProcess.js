"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var myApi = require('./my');

var utils = require('./utils.js');

var globalVar = require('./config').global;

var hasProxy = typeof Proxy !== 'undefined';

var _Proxy = function _Proxy() {};

if (hasProxy) {
  _Proxy = Proxy;
}

var myProxy = null;
/**
 * runtime error catch
 */

function warnApi(api) {
  var iscanIuse = globalVar.canIUse(api); // my下有此方法，但目前不可用

  if (!iscanIuse || api === 'getFileSystemManager') {
    utils.warn("\u652F\u4ED8\u5B9D\u6682\u4E0D\u652F\u6301".concat(api), {
      apiName: api,
      errorType: 0,
      type: 'api'
    });
    return function () {
      console.error("\u652F\u4ED8\u5B9D\u6682\u4E0D\u652F\u6301".concat(api));
    };
  }
}

module.exports = function () {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (myProxy) {
    return myProxy;
  }

  var _obj = Object.assign({}, obj, myApi);

  if (!hasProxy) {
    Object.keys(myApi).forEach(function (attr) {
      Object.defineProperty(_obj, attr, {
        get: function get() {
          var ret;

          if (myApi[attr]) {
            ret = function ret() {
              var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

              if (args) {
                return myApi[attr].fn(o, args);
              }

              return myApi[attr].fn(o);
            };
          } else {
            var helpFn = warnApi(attr);
            ret = obj[attr] || helpFn;
          }

          return ret;
        }
      });
    });
    return _obj;
  }

  myProxy = new _Proxy(_obj, {
    get: function get(target, attr) {
      var ret;

      if (typeof attr === 'string' && myApi[attr]) {
        if (typeof myApi[attr].fn === 'function') {
          ret = function ret() {
            var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            if (args) {
              return myApi[attr].fn(opts, args);
            }

            return myApi[attr].fn(opts);
          };
        } else {
          ret = myApi[attr];
        }
      } else {
        var helpFn = warnApi(attr);
        ret = target[attr] || helpFn;
      }

      return ret;
    }
  });
  return myProxy;
};
/**
 * for bindgetuserinfo open-type of button
 */


myApi.getUserInfoWrap = {
  fn: function fn() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var fn = arguments.length > 1 ? arguments[1] : undefined;
    globalVar.getAuthCode({
      scopes: 'auth_user',
      success: function success() {
        globalVar.getAuthUserInfo({
          success: function success(userInfo) {
            fn && fn(_objectSpread(_objectSpread({}, e), {}, {
              detail: {
                userInfo: userInfo
              }
            }));
          }
        });
      },
      fail: function fail(res) {
        fn && fn(_objectSpread(_objectSpread({}, e), {}, {
          detail: res
        }));
      }
    });
  }
};
/**
 * for bindgetphonenumber open-type of button
 */

myApi.getPhoneNumberWrap = {
  fn: function fn() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var fn = arguments.length > 1 ? arguments[1] : undefined;
    globalVar.getPhoneNumber({
      success: function success(res) {
        var encryptedData = res.response;
        e = _objectSpread(_objectSpread({}, e), {}, {
          detail: encryptedData,
          res: res
        });
        fn && fn(e);
      },
      fail: function fail(res) {
        e = _objectSpread(_objectSpread({}, e), {}, {
          detail: {},
          res: res
        });
        fn && fn(e);
      }
    });
  }
};