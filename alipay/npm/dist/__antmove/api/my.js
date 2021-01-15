"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var utils = require("./utils");

var propsPolyfill = require("./propsPolyfill");

var descObj = require("./desc.js");

var apiObj = {
  startBeaconDiscovery: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var startBeaconDiscoveryParams = descObj.startBeaconDiscovery.body.params.props;
      var params = utils.defineGetter(obj, startBeaconDiscoveryParams, function (_obj, prop) {
        utils.warn("startBeaconDiscovery\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "startBeaconDiscovery/".concat(prop),
          errorType: startBeaconDiscoveryParams[prop].type,
          type: 'api'
        });
      });
      return my.startBeaconDiscovery(params);
    }
  },
  stopBeaconDiscovery: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.stopBeaconDiscovery(obj);
    }
  },
  onBeaconUpdate: {
    fn: function fn(cb) {
      return my.onBeaconUpdate({
        success: cb,
        fail: cb
      });
    }
  },
  onBeaconServiceChange: {
    fn: function fn(cb) {
      return my.onBeaconServiceChange({
        success: cb,
        fail: cb,
        complete: cb
      });
    }
  },
  getBeacons: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return my.getBeacons(obj);
    }
  },
  writeBLECharacteristicValue: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.value) {
        obj.value = utils.ab2hex(obj.value);
      }

      my.writeBLECharacteristicValue(obj);
    }
  },
  createBLEConnection: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return my.connectBLEDevice(obj);
    }
  },
  closeBLEConnection: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return my.disconnectBLEDevice(obj);
    }
  },
  onBLEConnectionStateChange: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return my.onBLEConnectionStateChanged(obj);
    }
  },
  onBLECharacteristicValueChange: {
    fn: function fn(cb) {
      my.onBLECharacteristicValueChange(function (res) {
        res.value = utils.changeType(res.value);
        cb && cb(res);
      });
    }
  },
  getBLEDeviceServices: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getBLEDeviceServices(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          if (res.services) {
            res.services.forEach(function (item) {
              item.uuid = item.serviceId;
              delete item.serviceId;
            });
          }

          obj.success && obj.success(res);
        }
      }));
    }
  },
  getBLEDeviceCharacteristics: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getBLEDeviceCharacteristics(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          if (res.characteristics) {
            res.characteristics.forEach(function (item) {
              item.uuid = item.characteristicId;
              delete item.characteristicId;
            });
          }

          obj.success && obj.success(res);
        }
      }));
    }
  },
  addPhoneContact: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.weChatNumber) {
        obj.alipayAccount = obj.weChatNumber;
      }

      my.addPhoneContact(obj);
    }
  },
  startBluetoothDevicesDiscovery: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.interval) {
        obj.interval = Math.round(obj.interval);
      }

      my.startBluetoothDevicesDiscovery(obj);
    }
  },
  onBluetoothDeviceFound: {
    fn: function fn(cb) {
      var onBluetoothDeviceFoundProps = descObj.onBluetoothDeviceFound.body.returnValue.props;
      my.onBluetoothDeviceFound(function (res) {
        var arr = res.devices.map(function (item) {
          item.advertisData = utils.changeType(item.advertisData);
          return utils.defineGetter(item, onBluetoothDeviceFoundProps, function (obj, prop) {
            utils.warn("onBluetoothDeviceFound\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
              apiName: "onBluetoothDeviceFound/".concat(prop),
              errorType: onBluetoothDeviceFoundProps[prop].type,
              type: 'api'
            });
          });
        });
        res.devices = arr;
        cb && cb(res);
      });
    }
  },
  getBluetoothDevices: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var getBluetoothDevicesProps = descObj.getBluetoothDevices.body.returnValue.props.devices.props;
      my.getBluetoothDevices(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          var arr = res.devices.map(function (item) {
            item.advertisData = utils.changeType(item.advertisData);
            return utils.defineGetter(item, getBluetoothDevicesProps, function (_obj, prop) {
              utils.warn("getBluetoothDevices\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
                apiName: "getBluetoothDevices/".concat(prop),
                errorType: getBluetoothDevicesProps[prop].type,
                type: 'api'
              });
            });
          });
          res.devices = arr;
          obj.success && obj.success(res);
        }
      }));
    }
  },
  setClipboardData: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.data) {
        obj.text = obj.data;
        delete obj.data;
      }

      my.setClipboard(obj);
    }
  },
  getClipboardData: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getClipboard(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res.data = res.text;
          delete res.text;
          obj.success && obj.success(res);
        }
      }));
    }
  },
  onNetworkStatusChange: {
    fn: function fn(cb) {
      my.onNetworkStatusChange(function (res) {
        res.networkType = res.networkType.toLowerCase();
        var typeObjMap = {
          unknown: 'unknown',
          wifi: 'wifi',
          '2g': '2g',
          '3g': '3g',
          '4g': '4g'
        };

        if (res && !res.isConnected) {
          res.networkType = 'none';
        } else {
          res.networkType = typeObjMap[res.networkType] || res.networkType;
        }

        cb && cb(res);
      });
    }
  },
  setScreenBrightness: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.value) {
        obj.brightness = obj.value;
        delete obj.value;
      }

      my.setScreenBrightness(obj);
    }
  },
  getScreenBrightness: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getScreenBrightness({
        success: function success(res) {
          res.value = res.brightness;
          delete res.brightness;
          obj.success && obj.success(res);
        },
        fail: function fail(res) {
          obj.fail && obj.fail(res);
        }
      });
    }
  },
  scanCode: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      obj.hideAlbum = obj.onlyFromCamera || false;
      my.scan(obj);
    }
  },
  stopGyroscope: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var stopGyroscopeParams = descObj.stopGyroscope.body.params.props;
      var params = utils.defineGetter(obj, stopGyroscopeParams, function (_obj, prop) {
        utils.warn("stopGyroscope\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "stopGyroscope".concat(prop),
          errorType: stopGyroscopeParams[prop].type,
          type: 'api'
        });
      });
      return my.offGyroscopeChange(params);
    }
  },
  onCompassChange: {
    fn: function fn(cb) {
      var onCompassChangeReturnValue = descObj.onCompassChange.body.returnValue.props;
      my.onCompassChange(function (res) {
        var _res = utils.defineGetter(res, onCompassChangeReturnValue, function (obj, prop) {
          utils.warn("onCompassChange\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
            apiName: "onCompassChange/".concat(prop),
            errorType: onCompassChangeReturnValue[prop].type,
            type: 'api'
          });
        });

        cb && cb(_res);
      });
    }
  },
  stopCompass: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var stopCompassParams = descObj.stopCompass.body.params.props;
      var params = utils.defineGetter(obj, stopCompassParams, function (_obj, prop) {
        utils.warn("stopCompass\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "stopCompass/".concat(prop),
          errorType: stopCompassParams[prop].type,
          type: 'api'
        });
      });
      return my.offCompassChange(params);
    }
  },
  stopAccelerometer: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var stopAccelerometerParams = descObj.stopAccelerometer.body.params.props;
      var params = utils.defineGetter(obj, stopAccelerometerParams, function (_obj, prop) {
        utils.warn("stopAccelerometer\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "stopCompass/".concat(prop),
          errorType: stopAccelerometerParams[prop].type,
          type: 'api'
        });
      });
      return my.offAccelerometerChange(params);
    }
  },
  makePhoneCall: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var makePhoneCallParams = descObj.makePhoneCall.body.params.props;

      if (obj.phoneNumber) {
        obj.number = obj.phoneNumber;
        delete obj.phoneNumber;
      }

      var params = utils.defineGetter(obj, makePhoneCallParams, function (_obj, prop) {
        utils.warn("makePhoneCall\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "makePhoneCall/".concat(prop),
          errorType: makePhoneCallParams[prop].type,
          type: 'api'
        });
      });
      return my.makePhoneCall(params);
    }
  },
  canIUse: {
    fn: function fn(params) {
      var paramsList = params.split('.');

      if (paramsList[1] && paramsList[1] === 'success') {
        paramsList[1] = 'return';
      }

      var str = paramsList.join('.');
      return my.canIUse(str);
    }
  },
  getSystemInfoSync: {
    fn: function fn() {
      var ret = my.getSystemInfoSync();
      var getSystemInfoSyncProps = descObj.getSystemInfoSync.body.returnValue.props;
      ret = utils.defineGetter(ret, getSystemInfoSyncProps, function (obj, prop) {
        utils.warn("getSystemInfoSync\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "getSystemInfoSync/".concat(prop),
          errorType: getSystemInfoSyncProps[prop].type,
          type: 'api'
        });
      });
      /**
       * 处理Android屏幕宽度返回值
       */

      if (ret.platform.toLowerCase() === 'android') {
        ret.platform = 'android';
        ret.screenWidth /= ret.pixelRatio;
        ret.screenHeight /= ret.pixelRatio;
      } else if (ret.platform.toLowerCase() === 'ios') {
        ret.platform = 'ios'; // mock的安全区位置信息（模拟器iphonex screenHeight:812）

        if (ret.screenHeight >= propsPolyfill.screenHeight) {
          ret.safeArea = propsPolyfill.safeArea;
          ret.safeArea.bottom = ret.screenHeight - propsPolyfill.safeHeight;
        } else {
          ret.safeArea = {
            bottom: ret.screenHeight,
            height: ret.screenHeight,
            left: 0,
            right: ret.screenWidth,
            top: ret.statusBarHeight,
            width: ret.screenWidth
          };
        }
      } // mock的版本，确保微信小程序源码里读取后和目标版本匹配都能通过


      ret.SDKVersion = '10.0.0';
      return ret;
    }
  },
  getSystemInfo: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var getSystemInfoProps = descObj.getSystemInfo.body.returnValue.props;
      my.getSystemInfo(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res = utils.defineGetter(res, getSystemInfoProps, function (_obj, prop) {
            utils.warn("getSystemInfo\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
              apiName: "getSystemInfo/".concat(prop),
              errorType: getSystemInfoProps[prop].type,
              type: 'api'
            });
          });
          /**
           * 处理Android屏幕宽度返回值
           */

          if (res.platform.toLowerCase() === 'android') {
            res.platform = 'android';
            res.screenWidth /= res.pixelRatio;
            res.screenHeight /= res.pixelRatio;
          } else if (res.platform.toLowerCase() === 'ios') {
            res.platform = 'ios';

            if (res.screenHeight >= propsPolyfill.screenHeight) {
              res.safeArea = propsPolyfill.safeArea;
              res.safeArea.bottom = res.screenHeight - propsPolyfill.safeHeight;
            } else {
              res.safeArea = {
                bottom: res.screenHeight,
                height: res.screenHeight,
                left: 0,
                right: res.screenWidth,
                top: res.statusBarHeight,
                width: res.screenWidth
              };
            }
          } // mock的版本，确保微信小程序源码里读取后和目标版本匹配都能通过


          res.SDKVersion = '10.0.0';
          obj.success && obj.success(res);
        }
      }));
    }
  },
  showToast: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var showToastProps = descObj.showToast.body.params.props;

      if (obj.title) {
        obj.content = obj.title;
        delete obj.title;
      }

      if (!obj.duration) {
        obj.duration = 2000;
      }

      if (obj.icon) {
        if (obj.icon === 'success') {
          obj.type = 'success';
        } else if (obj.icon === 'loading') {
          obj.type = 'none';
          utils.warn('showToast暂不支持loading', {
            apiName: 'showToast/loading',
            errorType: 0,
            type: 'api'
          });
        } else {
          obj.type = 'none';
        }

        delete obj.icon;
      } else {
        obj.type = 'success';
      }

      var params = utils.defineGetter(obj, showToastProps, function (_obj, prop) {
        utils.warn("showToast\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "showToast/".concat(prop),
          errorType: showToastProps[prop].type,
          type: 'api'
        });
      });
      my.showToast(params);
    }
  },
  showModal: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var showModalProps = descObj.showModal.body.params.props;

      if (obj.cancelText !== undefined) {
        obj.cancelButtonText = obj.cancelText;
        delete obj.cancelText;
      }

      if (obj.confirmText !== undefined) {
        obj.confirmButtonText = obj.confirmText;
        delete obj.confirmText;
      }

      var params = utils.defineGetter(obj, showModalProps, function (_obj, prop) {
        utils.warn("showModal\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "showModal/".concat(prop),
          errorType: showModalProps[prop].type,
          type: 'api'
        });
      });
      my.confirm(_objectSpread(_objectSpread({}, params), {}, {
        success: function success(res) {
          if (res.confirm) {
            res.cancel = false;
          } else {
            res.cancel = true;
          }

          obj.success && obj.success(res);
        }
      }));
    }
  },
  showLoading: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var showLoadingProps = descObj.showLoading.body.params.props;

      if (obj.title) {
        obj.content = obj.title;
        delete obj.title;
      }

      var params = utils.defineGetter(obj, showLoadingProps, function (_obj, prop) {
        utils.warn("showLoading\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "showLoading/".concat(prop),
          errorType: showLoadingProps[prop].type,
          type: 'api'
        });
      });
      my.showLoading(params);
    }
  },
  showActionSheet: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var showActionSheetProps = descObj.showActionSheet.body.params.props;

      if (obj.itemList) {
        obj.items = obj.itemList;
        delete obj.itemList;
      }

      var params = utils.defineGetter(obj, showActionSheetProps, function (_obj, prop) {
        utils.warn("showActionSheet\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "showActionSheet/".concat(prop),
          errorType: showActionSheetProps[prop].type,
          type: 'api'
        });
      });
      my.showActionSheet(_objectSpread(_objectSpread({}, params), {}, {
        success: function success(res) {
          res.tapIndex = res.index;
          delete res.index;
          obj.success && obj.success(res);
        }
      }));
    }
  },
  hideToast: {
    fn: function fn(obj) {
      try {
        my.hideToast();
        obj.success && obj.success({
          errMsg: 'hideToast: ok'
        });
      } catch (err) {
        obj.fail && obj.fail(err);
      } finally {
        obj.complete && obj.complete({
          errMsg: 'hideToast: ok'
        });
      }
    }
  },
  hideLoading: {
    fn: function fn(obj) {
      try {
        my.hideLoading();
        obj.success && obj.success({
          errMsg: 'hideLoading: ok'
        });
      } catch (err) {
        obj.fail && obj.fail(err);
      } finally {
        obj.complete && obj.complete({
          errMsg: 'hideLoading: ok'
        });
      }
    }
  },
  showNavigationBarLoading: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      try {
        my.showNavigationBarLoading();
        obj.success && obj.success({
          errMsg: 'showNavigationBarLoading: ok'
        });
      } catch (err) {
        obj.fail && obj.fail(err);
      } finally {
        obj.complete && obj.complete({
          errMsg: 'showNavigationBarLoading: ok'
        });
      }
    }
  },
  setNavigationBarTitle: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return my.setNavigationBar(obj);
    }
  },
  setNavigationBarColor: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return my.setNavigationBar(obj);
    }
  },
  hideNavigationBarLoading: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      try {
        my.hideNavigationBarLoading();
        obj.success && obj.success({
          errMsg: 'hideNavigationBarLoading: ok'
        });
      } catch (err) {
        obj.fail && obj.fail(err);
      } finally {
        obj.complete && obj.complete({
          errMsg: 'hideNavigationBarLoading: ok'
        });
      }
    }
  },
  setTabBarStyle: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.color && obj.color.length === 4) {
        var color = obj.color.slice(1);
        obj.color = "#".concat(color).concat(color);
      }

      my.setTabBarStyle(obj);
    }
  },
  setTabBarItem: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!obj.iconPath || !obj.selectedIconPath) {
        utils.warn('setTabBarItem的iconPath和selectedIconPath是必传的!', {
          apiName: 'setTabBarItem/iconPath和selectedIconPath',
          errorType: 0,
          type: 'api'
        });
      }

      my.setTabBarItem(obj);
    }
  },
  stopPullDownRefresh: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      try {
        my.stopPullDownRefresh();
        obj.success && obj.success({
          errMsg: 'stopPullDownRefresh: ok'
        });
      } catch (err) {
        obj.fail && obj.fail(err);
      } finally {
        obj.complete && obj.complete({
          errMsg: 'stopPullDownRefresh: ok'
        });
      }
    }
  },
  pageScrollTo: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var pageScrollToParams = descObj.pageScrollTo.body.params.props;
      var params = utils.defineGetter(obj, pageScrollToParams, function (_obj, prop) {
        utils.warn("pageScrollTo\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "pageScrollTo/".concat(prop),
          errorType: pageScrollToParams[prop].type,
          type: 'api'
        });
      });
      my.pageScrollTo(params);

      try {
        my.pageScrollTo();
        obj.success && obj.success({
          errMsg: 'pageScrollTo: ok'
        });
      } catch (err) {
        obj.fail && obj.fail(err);
      } finally {
        obj.complete && obj.complete({
          errMsg: 'pageScrollTo: ok'
        });
      }
    }
  },
  request: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.header) {
        obj.headers = obj.header;
        delete obj.header;
      }

      obj.method = obj.method || 'GET';
      obj.method = obj.method.toUpperCase();

      if (obj.method !== 'GET' && obj.method !== 'POST') {
        utils.warn("request\u6682\u4E0D\u652F\u6301".concat(obj.method, "\u8BF7\u6C42\u65B9\u5F0F"), {
          apiName: "request/".concat(obj.method),
          errorType: 0,
          type: 'api'
        });
        obj.method = 'GET';
      }

      if (obj.responseType) {
        utils.warn('支付宝暂不支持responseType', {
          apiName: 'request/responseType',
          errorType: 0,
          type: 'api'
        });
      }

      var task = my.request(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res.header = res.headers;
          res.statusCode = res.status;
          delete res.headers;
          delete res.status;
          obj.success && obj.success(res);
        },
        fail: function fail(err) {
          var errMsg = 'request:fail abort';

          if (err.errorMessage === errMsg) {
            err = {
              errMsg: errMsg
            };
          }

          obj.fail && obj.fail(err);
        },
        complete: function complete(res) {
          obj.complete && obj.complete(res);
        }
      }));
      task = task || {};

      task.onHeadersReceived = function () {};

      task.offHeadersReceived = function () {};

      return task;
    }
  },
  createMapContext: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var createMapContextProps = descObj.createMapContext.body.returnValue.props;
      var data = my.createMapContext(obj);

      for (var key in createMapContextProps) {
        if (createMapContextProps[key].type === 0) {
          data[key] = function () {};
        }
      }

      return utils.defineGetter(data, createMapContextProps, function (_obj, prop) {
        utils.warn("createMapContext\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "createMapContext/".concat(prop),
          errorType: createMapContextProps[prop].type,
          type: 'api'
        });
      });
    }
  },
  createVideoContext: {
    fn: function fn(id, that) {
      if (that) {
        utils.warn('createVideoContext暂不支持传递实例this', {
          apiName: 'createVideoContext',
          errorType: 0,
          type: 'api'
        });
      }

      return my.createVideoContext(id);
    }
  },
  createCameraContext: {
    fn: function fn() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var res = my.createCameraContext(id);

      res.setZoom = function () {
        utils.warn('支付宝暂不支持setZoom', {
          apiName: 'createCameraContext/setZoom',
          errorType: 0,
          type: 'api'
        });
      };

      return res;
    }
  },
  previewImage: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var imgList = obj.urls || [];
      var index = imgList.indexOf(obj.current);
      obj.current = index;
      return my.previewImage(obj);
    }
  },
  compressImage: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.src) {
        obj.apFilePaths = [obj.src];
        delete obj.src;
      }

      my.compressImage(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res.tempFilePath = res.apFilePaths[0];
          delete res.apFilePath;
          obj.success && obj.success(res);
        }
      }));
    }
  },
  chooseImage: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!obj.count) {
        obj.count = 9;
      }

      my.chooseImage(_objectSpread(_objectSpread({}, obj), {}, {
        // success(res) {
        // res.tempFilePaths = res.apFilePaths
        // delete res.apFilePath
        // utils.warn('暂不支持tempFiles', {
        //   apiName: 'chooseImage/tempFiles',
        //   errorType: 0,
        //   type: 'api',
        // })
        //   obj.success && obj.success(res)
        // },
        fail: function fail(err) {
          err.errMsg = err.errorMessage || '';
        }
      }));
    }
  },
  saveImageToPhotosAlbum: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.filePath) {
        obj.url = obj.filePath;
      }

      return my.saveImage(obj);
    }
  },
  openLocation: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.scale) {
        utils.warn('支付宝scale的取值为3-19，默认15', {
          apiName: 'openLocation/scale',
          errorType: 4,
          type: 'api'
        });

        if (obj.scale > 19) {
          obj.scale = 19;
        } else if (obj.scale < 3) {
          obj.scale = 3;
        }
      }

      return my.openLocation(obj);
    }
  },
  getLocation: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = obj.type || 'wgs84';
      var getLocationProps = descObj.getLocation.body.returnValue.props;
      my.getLocation(_objectSpread(_objectSpread({}, obj), {}, {
        type: 0,
        success: function success(res) {
          var data = res;

          if (type === 'wgs84') {
            var lnglat = utils.gcj02towgs84(res.longitude, res.latitude);
            data = Object.assign(res, {
              longitude: lnglat[0],
              latitude: lnglat[1]
            });
          }

          data = utils.defineGetter(data, getLocationProps, function (_obj, prop) {
            utils.warn("getLocation\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
              apiName: "getLocation/".concat(prop),
              errorType: getLocationProps[prop].type,
              type: 'api'
            });
          });
          obj.success && obj.success(data);
        }
      }));
    }
  },
  openCard: {
    fn: function fn(obj) {
      var openCardParams = descObj.openCard.body.params.props;
      var params = utils.defineGetter(obj, openCardParams, function (_obj, prop) {
        utils.warn("openCard\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "openCard/".concat(prop),
          errorType: openCardParams[prop].type,
          type: 'api'
        });
      });
      return my.openCardList(params);
    }
  },
  login: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getAuthCode({
        scopes: 'auth_base',
        success: function success(res) {
          var resObj = {
            code: res.authCode
          };

          if (res.authCode) {
            resObj.errMsg = 'login:ok';

            if (obj.success) {
              obj.success(resObj);
            }
          } else {
            resObj.errMsg = 'login:fail';

            if (obj.success) {
              obj.success(resObj);
            }
          }
        },
        fail: function fail(err) {
          if (obj.fail) {
            obj.fail(err);
          }
        },
        complete: function complete(res) {
          if (res.authCode) {
            var resObj = {
              code: res.authCode,
              errMsg: 'login:ok'
            };

            if (obj.complete) {
              obj.complete(resObj);
            }
          } else if (obj.complete) {
            obj.complete(res);
          }
        }
      });
    }
  },
  hideKeyboard: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.hideKeyboard(obj);

      if (typeof obj.success === 'function') {
        obj.success();
      }

      if (typeof obj.complete === 'function') {
        obj.complete();
      }
    }
  },
  getNetworkType: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getNetworkType(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res.networkType = res.networkType.toLowerCase();
          var typeObjMap = {
            unknown: 'unknown',
            wifi: 'wifi',
            '2g': '2g',
            '3g': '3g',
            '4g': '4g'
          };

          if (res && !res.networkAvailable) {
            res.networkType = 'none';
          } else {
            res.networkType = typeObjMap[res.networkType] || res.networkType;
          }

          obj.success && obj.success(res);
        }
      }));
    }
  },
  canvasToTempFilePath: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ctx = my.createCanvasContext(obj.canvasId);
      ctx.toTempFilePath(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res.tempFilePath = res.apFilePath;
          delete res.apFilePath;
          obj.success && obj.success(res);
        }
      }));
    }
  },
  canvasPutImageData: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ctx = my.createCanvasContext(obj.canvasId);
      ctx.putImageData(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          obj.success && obj.success(res);
        }
      }));
    }
  },
  canvasGetImageData: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var ctx = my.createCanvasContext(obj.canvasId);
      ctx.getImageData(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          obj.success && obj.success(res);
        }
      }));
    }
  },
  saveFile: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.tempFilePath) {
        obj.apFilePath = obj.tempFilePath;
        delete obj.tempFilePath;
      }

      my.saveFile(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res.savedFilePath = res.apFilePath;
          delete res.apFilePath;
          obj.success && obj.success(res);
        }
      }));
    }
  },
  removeSavedFile: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.filePath) {
        obj.apFilePath = obj.filePath;
        delete obj.filePath;
      }

      return my.removeSavedFile(obj);
    }
  },
  getSavedFileList: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getSavedFileList({
        success: function success(res) {
          if (res.fileList.length) {
            var ret = res.fileList.map(function (item) {
              item.filePath = item.apFilePath;
              delete item.apFilePath;
              return item;
            });
            res.fileList = ret;
            obj.success && obj.success(res);
          } else {
            obj.success && obj.success(res);
          }
        }
      });
    }
  },
  getSavedFileInfo: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.filePath) {
        obj.apFilePath = obj.filePath;
        delete obj.filePath;
      }

      return my.getSavedFileInfo(obj);
    }
  },
  getFileInfo: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.filePath) {
        obj.apFilePath = obj.filePath;
        delete obj.filePath;
      }

      return my.getFileInfo(obj);
    }
  },
  downloadFile: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var downloadFileReturnValue = descObj.downloadFile.body.returnValue.props;

      if (obj.filePath !== undefined) {
        utils.warn('支付宝暂不支持 filePath', {
          apiName: 'downloadFile/filePath',
          errorType: 0,
          type: 'api'
        });
      }

      my.downloadFile(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success(res) {
          res.tempFilePath = res.apFilePath;

          if (res.apFilePath) {
            res.statusCode = 200;
          }

          delete res.apFilePath;

          if (!res.statusCode) {
            utils.warn('支付宝暂不支持statusCode', {
              apiName: 'downloadFile/statusCode',
              errorType: 0,
              type: 'api'
            });
          }

          obj.success && obj.success(res);
        }
      }));
      var task = {
        abort: function abort() {},
        offHeadersReceived: function offHeadersReceived() {},
        offProgressUpdate: function offProgressUpdate() {},
        onHeadersReceived: function onHeadersReceived() {},
        onProgressUpdate: function onProgressUpdate() {}
      };
      return utils.defineGetter(task, downloadFileReturnValue, function (_obj, prop) {
        utils.warn("downloadFile\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "downloadFile/".concat(prop),
          errorType: downloadFileReturnValue[prop].type,
          type: 'api'
        });
      });
    }
  },
  uploadFile: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var uploadFileValue = descObj.uploadFile.body.returnValue.props;

      if (obj.name) {
        obj.fileName = obj.name;
        delete obj.name;
      }

      var pathArr = obj.filePath.split('.');
      obj.fileType = 'image';
      var fileType = {
        video: ['ogg', 'avi', 'wma', 'rmvb', 'rm', 'flash', 'mp4', '3gp'],
        audio: ['wav', 'mp3']
      };
      var typeName = pathArr[pathArr.length - 1];
      Object.keys(fileType).forEach(function (key) {
        fileType[key].forEach(function (item) {
          if (typeName.toLowerCase() === item) {
            obj.fileType = key;
          }
        });
      });
      my.uploadFile(obj);
      var task = {
        abort: function abort() {},
        offHeadersReceived: function offHeadersReceived() {},
        offProgressUpdate: function offProgressUpdate() {},
        onHeadersReceived: function onHeadersReceived() {},
        onProgressUpdate: function onProgressUpdate() {}
      };
      return utils.defineGetter(task, uploadFileValue, function (_obj, prop) {
        utils.warn("uploadFile\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "uploadFile/".concat(prop),
          errorType: uploadFileValue[prop].type,
          type: 'api'
        });
      });
    }
  },
  connectSocket: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var connectSocketParams = descObj.connectSocket.body.params.props;
      var params = utils.defineGetter(obj, connectSocketParams, function (_obj, prop) {
        utils.warn("connectSocket\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "connectSocket/".concat(prop),
          errorType: connectSocketParams[prop].type,
          type: 'api'
        });
      });
      my.connectSocket(params);
      var task = {
        close: function close() {
          var _obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          my.closeSocket(_obj);
        },
        onClose: function onClose(fn) {
          my.onSocketClose(fn);
        },
        onError: function onError(fn) {
          my.offSocketOpen(fn);
        },
        onMessage: function onMessage(fn) {
          my.onSocketMessage(fn);
        },
        onOpen: function onOpen(fn) {
          my.onSocketOpen(function (res) {
            fn(res);
          });
        },
        send: function send() {
          var _obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          my.sendSocketMessage(_obj);
        }
      };
      return task;
    }
  },
  onSocketOpen: {
    fn: function fn(obj) {
      my.onSocketOpen(function (res) {
        utils.warn('onSocketOpen 成功回调缺少header', {
          apiName: 'onSocketOpen/header',
          errorType: 0,
          type: 'api'
        });
        obj(res);
      });
    }
  },
  closeSocket: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var closeSocketParams = descObj.closeSocket.body.params.props;
      var params = utils.defineGetter(obj, closeSocketParams, function (_obj, prop) {
        utils.warn("closeSocket\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "closeSocket/".concat(prop),
          errorType: closeSocketParams[prop].type,
          type: 'api'
        });
      });
      my.closeSocket(params);
    }
  },
  getRecorderManager: {
    fn: function fn() {
      var getRecorderManagerProps = descObj.getRecorderManager.body.returnValue.props;
      var RecorderManager = my.getRecorderManager();

      for (var key in getRecorderManagerProps) {
        if (getRecorderManagerProps[key].type === 0) {
          RecorderManager[key] = function () {};
        }
      }

      return utils.defineGetter(RecorderManager, getRecorderManagerProps, function (obj, prop) {
        utils.warn("getRecorderManager\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "getRecorderManager/".concat(prop),
          errorType: getRecorderManagerProps[prop].type,
          type: 'api'
        });
      });
    }
  },
  setStorageSync: {
    fn: function fn() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return my.setStorageSync({
        key: key,
        data: data
      });
    }
  },
  getStorage: {
    fn: function fn(obj) {
      return my.getStorage({
        key: obj.key,
        success: function success(res) {
          if (res.message && res.message === '查无此key' && typeof obj.fail === 'function') {
            var Msg = {
              errMsg: 'getStorage:fail data not found'
            };
            obj.fail(Msg);
          } else if (typeof obj.success === 'function') {
            obj.success(res);
          }
        },
        complete: function complete(res) {
          if (typeof obj.complete === 'function') {
            if (res.message && res.message === '查无此key') {
              var Msg = {
                errMsg: 'getStorage:fail data not found'
              };
              obj.complete(Msg);
            } else {
              obj.complete(res);
            }
          }
        }
      });
    }
  },
  getStorageSync: {
    fn: function fn() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var storeData = my.getStorageSync({
        key: key
      });
      return storeData.data || '';
    }
  },
  removeStorageSync: {
    fn: function fn() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return my.removeStorageSync({
        key: key
      });
    }
  },
  removeStorage: {
    fn: function fn(obj) {
      var Msg = {
        errMsg: 'removeStorage:ok'
      };
      return my.removeStorage(_objectSpread(_objectSpread({}, obj), {}, {
        success: function success() {
          if (typeof obj.success === 'function') {
            obj.success(Msg);
          }
        },
        complete: function complete() {
          if (typeof obj.complete === 'function') {
            obj.complete(Msg);
          }
        }
      }));
    }
  },
  createSelectorQuery: {
    fn: function fn() {
      var SQ = my.createSelectorQuery();

      function Query() {
        var _this = this;

        this.query = SQ;
        this._selectType = 0; // 0: array, 1: object

        this["in"] = function (p) {
          if (typeof this.query["in"] === 'function') {
            this.query["in"](p);
            return this;
          } else {
            return this;
          }
        };

        this.select = function (p) {
          var s = utils.parseSelector(p);
          this.query.select(s);
          this._selectType = 1;
          return this;
        };

        this.node = function () {
          utils.warn('支付宝暂不支持使用SelectorQuery NodesRef.node', {
            apiName: 'SelectorQuery NodesRef.node',
            errorType: 0,
            type: 'api'
          });
          return _this;
        };

        this.selectAll = function (p) {
          var s = utils.parseSelector(p);
          this.query.selectAll(s);
          return this;
        };

        this.selectViewport = function (p) {
          this.query.selectViewport(p);
          return this;
        };

        this.boundingClientRect = function (p) {
          this.query.boundingClientRect();
          this.exec(p);
          return this;
        };

        this.scrollOffset = function (p) {
          var self = this;
          this.query.scrollOffset().exec(function (ret) {
            if (self._selectType) {
              self._selectType = 0;

              if (Array.isArray(ret) && ret.length === 1) {
                ret = ret[0];
              }
            }

            p && p(ret);
          });
          return this;
        };

        this.exec = function (p) {
          var _this2 = this;

          this.query.exec(function (ret) {
            if (Array.isArray(ret)) {
              ret = ret.map(function (obj) {
                return Array.isArray(obj) ? obj.map(function (item) {
                  return _objectSpread(_objectSpread({}, item), {}, {
                    id: utils.nextUid()
                  });
                }) : _objectSpread(_objectSpread({}, obj), {}, {
                  id: utils.nextUid()
                });
              });
            }

            if (_this2._selectType) {
              _this2._selectType = 0;

              if (Array.isArray(ret)) {
                if (ret.length === 1) {
                  ret = ret[0];
                } else if (ret.length > 1) {
                  utils.warn('支付宝SelectorQuery.exec查询结果按请求次序构成数组，数组中每项为一次查询的结果', {
                    apiName: 'boundingClientRect',
                    errorType: 1,
                    type: 'api'
                  });
                }
              }
            }

            p && p(ret);
          });
          return this;
        };
      }

      Query.prototype = SQ;
      var res = new Query();
      return res;
    }
  },
  createIntersectionObserver: {
    fn: function fn() {
      var _my;

      var OB = (_my = my).createIntersectionObserver.apply(_my, arguments);

      function Observer() {
        this.observer = OB;

        this.relativeTo = function () {
          var t = utils.parseSelector(arguments.length <= 0 ? undefined : arguments[0]);
          var o = arguments.length <= 1 ? undefined : arguments[1];
          this.observer.relativeTo(t, o);
          return this;
        };

        this.relativeToViewport = function () {
          var _this$observer;

          (_this$observer = this.observer).relativeToViewport.apply(_this$observer, arguments);

          return this;
        };

        this.observe = function () {
          var t = utils.parseSelector(arguments.length <= 0 ? undefined : arguments[0]);
          var cb = arguments.length <= 1 ? undefined : arguments[1];
          this.observer.observe(t, function (ret) {
            cb && cb(ret);
          });
        };
      }

      Observer.prototype = OB;
      var res = new Observer();
      return res;
    }
  },
  createAnimation: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (obj.timingFunction) {
        obj.timeFunction = obj.timingFunction;
        delete obj.timingFunction;
      }

      var animation = my.createAnimation(obj);
      animation.config.delay = animation.config.delay || 0;
      animation.option = {
        transition: animation.config,
        transformOrigin: animation.config.transformOrigin
      };
      return animation;
    }
  },
  showShareMenu: {
    fn: function fn() {
      return my.showSharePanel();
    }
  },
  saveVideoToPhotosAlbum: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var params = _objectSpread(_objectSpread({}, obj), {}, {
        src: obj.filePath
      });

      return my.saveVideoToPhotosAlbum(params);
    }
  },
  chooseAddress: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.getAddress({
        success: function success(_res) {
          var result = {};
          var res = _res.result;
          result.cityName = res.city;
          result.countyName = res.area;
          result.detailInfo = res.street;
          result.errMsg = 'chooseAddress:ok';
          result.nationalCode = '';
          result.postalCode = '';
          result.provinceName = res.prov;
          result.telNumber = res.mobilePhone;
          result.userName = res.fullname;
          obj.success && obj.success(result);
        }
      });
    }
  },
  chooseVideo: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.chooseVideo({
        success: function success(result) {
          result.tempFilePath = result.apFilePath;
          delete result.apFilePath;
          obj.success && obj.success(result);
        }
      });
    }
  },
  getUpdateManager: {
    fn: function fn() {
      return my.getUpdateManager();
    }
  },
  getUserInfo: {
    fn: function fn(obj) {
      var getUserInfoSuccessRes = descObj.getUserInfo.body.params.props;

      if (obj.withCredentials || obj.lang) {
        utils.warn('GetAuthUserInfo不支持 withCredentials 或 lang 参数.', {
          apiName: 'getUserInfo/withCredentials 或 getUserInfo/lang',
          errorType: 0,
          type: 'api'
        });
      }

      my.getAuthCode({
        scopes: 'auth_user',
        success: function success() {
          my.getAuthUserInfo(_objectSpread(_objectSpread({}, obj), {}, {
            success: function success(res) {
              utils.defineGetter(res, getUserInfoSuccessRes, function (_obj, prop) {
                utils.warn("getUserInfo\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
                  apiName: "getUserInfo/".concat(prop),
                  errorType: getUserInfoSuccessRes[prop].type,
                  type: 'api'
                });
              });
              var _res = {};
              _res.userInfo = res;
              _res.userInfo.avatarUrl = res.avatar;
              obj.success && obj.success(_res);
            }
          }));
        }
      });
    }
  },
  reportAnalytics: {
    fn: function fn(key, value) {
      if (_typeof(value) !== 'object') {
        if (!(value instanceof Object)) {
          value = {
            data: value
          };
        }
      }

      return my.reportAnalytics(key, value);
    }
  },
  requestPayment: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var requestPaymentParams = descObj.requestPayment.body.params.props;
      var params = utils.defineGetter(obj, requestPaymentParams, function (_obj, prop) {
        utils.warn("requestPayment\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "requestPayment/".concat(prop),
          errorType: requestPaymentParams[prop].type,
          type: 'api'
        });
      });
      return my.tradePay(params);
    }
  },
  authorize: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var authorizeParams = descObj.authorize.body.params.props;

      if (obj.scope) {
        delete obj.scope;
        obj.scopes = 'auth_user';
      }

      var params = utils.defineGetter(obj, authorizeParams, function (_obj, prop) {
        utils.warn("authorize\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "authorize/".concat(prop),
          errorType: authorizeParams[prop].type,
          type: 'api'
        });
      });
      return my.getAuthCode(params);
    }
  },
  addCard: {
    fn: function fn(obj) {
      var addCardParams = descObj.addCard.body.params.props;
      var params = utils.defineGetter(obj, addCardParams, function (_obj, prop) {
        utils.warn("addCard\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "startSoterAuthentication/".concat(prop),
          errorType: addCardParams[prop].type,
          type: 'api'
        });
      });
      return my.addCardAuth(params);
    }
  },
  startSoterAuthentication: {
    fn: function fn(obj) {
      var startSoterAuthenticationParams = descObj.startSoterAuthentication.body.params.props;
      var params = utils.defineGetter(obj, startSoterAuthenticationParams, function (_obj, prop) {
        utils.warn("startSoterAuthentication\u7684\u53C2\u6570\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: prop,
          errorType: startSoterAuthenticationParams[prop].type,
          type: 'api'
        });
      });
      return my.ap.faceVerify(params);
    }
  },
  getSetting: {
    fn: function fn() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      function setLocation(cb) {
        my.getLocation({
          success: function success(res) {
            res.authSetting['scope.userLocation'] = true;
            cb && cb();
          }
        });
      }

      if (my.getSetting) {
        my.getSetting(_objectSpread(_objectSpread({}, options), {}, {
          success: function success(res) {
            var success = options.success;

            if (!success) {
              return;
            }

            success({
              authSetting: utils.mapAuthSetting(res.authSetting)
            });
          }
        }));
      } else {
        var res = {};
        res.authSetting = {};
        /**
                   * scope=[userInfo, location, album, camera, audioRecord]
                   */

        if (options && options.success) {
          setLocation(function () {
            options.success(res);
          });
        }
      }
    }
  },
  openSetting: {
    fn: function fn() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      my.openSetting(_objectSpread(_objectSpread({}, options), {}, {
        success: function success(res) {
          var success = options.success;

          if (!success) {
            return;
          }

          success({
            authSetting: utils.mapAuthSetting(res.authSetting)
          });
        }
      }));
    }
  },
  hideHomeButton: {
    fn: function fn() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var hideHomeButtonProps = descObj.hideHomeButton.body.params.props;
      var param = utils.defineGetter(obj, hideHomeButtonProps, function (_obj, prop) {
        utils.warn("hideHomeButton\u7684\u8FD4\u56DE\u503C\u4E0D\u652F\u6301 ".concat(prop, " \u5C5E\u6027!"), {
          apiName: "hideHomeButton/".concat(prop),
          errorType: hideHomeButtonProps[prop].type,
          type: 'api'
        });
      });
      return my.hideBackHome(param);
    }
  },
  cloud: {
    init: function init() {
      utils.warn('支付宝暂不支持init', {
        apiName: 'cloud/init',
        errorType: 0,
        type: 'api'
      });
    }
  },
  nextTick: function nextTick(fn) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (typeof fn === 'function') {
      if (!delay) {
        Promise.resolve().then(fn);
      } else {
        setTimeout(fn, delay);
      }
    }
  }
};
module.exports = apiObj;