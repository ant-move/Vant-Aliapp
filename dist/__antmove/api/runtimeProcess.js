"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var myApi = require('./my');

var utils = require('./utils.js');

var hasProxy = typeof Proxy !== 'undefined';

var _Proxy = function _Proxy() {};

if (hasProxy) _Proxy = Proxy;
/**
 * runtime error catch
 */

function warnApi(api) {
  var iscanIuse = my.canIUse(api);

  if (!iscanIuse) {
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

  var _obj = Object.assign({}, obj, myApi);

  if (!hasProxy) {
    Object.keys(myApi).forEach(function (attr) {
      Object.defineProperty(_obj, attr, {
        get: function get() {
          var ret;

          if (myApi[attr]) {
            ret = function ret() {
              var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

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

  return new _Proxy(obj, {
    get: function get(target, attr) {
      var ret;

      if (typeof attr === 'string' && myApi[attr]) {
        ret = function ret() {
          var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

          if (args) {
            return myApi[attr].fn(obj, args);
          }

          return myApi[attr].fn(obj);
        };
      } else {
        var helpFn = warnApi(attr);
        ret = target[attr] || helpFn;
      }

      return ret;
    }
  });
};
/**
 * for bindgetuserinfo open-type of button
 */


myApi.getUserInfoWrap = {
  fn: function fn() {
    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _fn = arguments.length > 1 ? arguments[1] : undefined;

    my.getAuthCode({
      scopes: 'auth_user',
      success: function success() {
        my.getAuthUserInfo({
          success: function success(userInfo) {
            _fn && _fn(_objectSpread({}, e, {
              detail: {
                userInfo: userInfo
              }
            }));
          }
        });
      },
      fail: function fail(res) {
        _fn && _fn(_objectSpread({}, e, {
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

    var _fn2 = arguments.length > 1 ? arguments[1] : undefined;

    my.getPhoneNumber({
      success: function success(res) {
        var encryptedData = res.response;
        e = _objectSpread({}, e, {
          detail: encryptedData,
          res: res
        });
        _fn2 && _fn2(e);
      },
      fail: function fail(res) {
        e = _objectSpread({}, e, {
          detail: {},
          res: res
        });
        _fn2 && _fn2(e);
      }
    });
  }
};