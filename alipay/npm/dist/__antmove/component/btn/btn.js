"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var utils = require('../../api/utils');

var processDataSet = require('../utils/processDataSet');

Component({
  data: {
    isUpdating: false,
    scope: '',
    getAuthorize: '',
    styleV2: my.styleV2
  },
  props: {
    size: 'default',
    type: '',
    plain: false,
    disabled: false,
    loading: false,
    'form-type': '',
    'open-type': '',
    'app-parameter': '',
    'hover-class': 'button-hover',
    'hover-stop-propagation': false,
    'hover-start-time': false,
    className: '',
    onTap: function onTap() {},
    onGetUserInfo: '',
    onGetPhoneNumber: ''
  },
  onInit: function onInit() {
    this.updateData();
  },
  deriveDataFromProps: function deriveDataFromProps(nextProps) {
    var size = nextProps.size,
        type = nextProps.type,
        plain = nextProps.plain,
        disabled = nextProps.disabled,
        loading = nextProps.loading,
        formType = nextProps.formType,
        openType = nextProps.openType,
        hoverClass = nextProps.hoverClass,
        hoverStopPropagation = nextProps.hoverStopPropagation,
        hoverStartTime = nextProps.hoverStartTime,
        appParameter = nextProps.appParameter;
    var opentype = this.getOpenType(openType);
    var scope = this.getScope(openType);
    var params = {
      size: size,
      type: type,
      plain: plain,
      disabled: disabled,
      loading: loading,
      formType: formType,
      opentype: opentype,
      scope: scope,
      hoverClass: hoverClass,
      hoverStopPropagation: hoverStopPropagation,
      hoverStartTime: hoverStartTime,
      appParameter: appParameter
    };
    Object.keys(params).forEach(function (key) {
      return params[key] === undefined && delete params[key];
    });
    this.setData(params);
  },
  methods: {
    updateData: function updateData() {
      var _this = this;

      if (this.data.isUpdating) {
        return;
      }

      this.setData({
        isUpdating: true
      });

      for (var key in this.props) {
        if (this.props.hasOwnProperty(key)) {
          typeof this.props[key] === 'string' && (this.props[key] = this.props[key].replace(/(^\s*)|(\s*$)/g, ''));
        }
      }

      var _this$props = this.props,
          size = _this$props.size,
          type = _this$props.type,
          plain = _this$props.plain,
          disabled = _this$props.disabled,
          loading = _this$props.loading,
          formType = _this$props.formType,
          hoverClass = _this$props.hoverClass,
          hoverStopPropagation = _this$props.hoverStopPropagation,
          hoverStartTime = _this$props.hoverStartTime,
          appParameter = _this$props.appParameter,
          openType = _this$props.openType;
      this.getSystem(function () {
        var opentype = _this.getOpenType(openType);

        var scope = _this.getScope(openType);

        _this.setData({
          isUpdating: false,
          size: size,
          type: type,
          plain: plain,
          disabled: disabled,
          loading: loading,
          formType: formType,
          opentype: opentype,
          hoverClass: hoverClass,
          hoverStopPropagation: hoverStopPropagation,
          hoverStartTime: hoverStartTime,
          appParameter: appParameter,
          scope: scope
        });
      });
    },
    getSystem: function getSystem(cb) {
      var that = this;
      my.getSystemInfo({
        success: function success(res) {
          var app = '';

          if (res.app && res.app === 'amap') {
            app = 'amap';
          } else {
            app = 'alipay';
          }

          that.setData({
            app: app
          });
          cb();
        }
      });
    },
    getOpenType: function getOpenType(opentype) {
      var transformList = {
        getPhoneNumber: 'getAuthorize',
        getUserInfo: 'getAuthorize'
      };

      if (transformList[opentype]) {
        return transformList[opentype];
      }

      var allowList = ['share', 'launchApp', 'getAuthorize', 'openSetting'];

      if (this.data.app === 'amap') {
        allowList = ['share', 'getAuthorize', 'openSetting'];
      }

      if (opentype) {
        if (allowList.indexOf(opentype) !== -1) {
          return opentype;
        } else {
          utils.warn("\u5C0F\u7A0B\u5E8Fopen-type\u503C\u4E0D\u652F\u6301".concat(opentype), {
            apiName: "button/open-type/".concat(opentype),
            errorType: 0,
            type: 'component'
          });
        }
      }

      return '';
    },
    getScope: function getScope(opentype) {
      var scopeMap = {
        getPhoneNumber: 'phoneNumber',
        getUserInfo: 'userInfo'
      };
      return scopeMap[opentype] || '';
    },
    onError: function onError(err) {
      if (this.props.onError === 'function') {
        this.props.onError(err);
      }
    },
    getAuthorize: function getAuthorize() {
      var that = this;
      var resObj = {};

      if (this.data.opentype === 'getAuthorize' && this.data.scope === 'phoneNumber') {
        my.getPhoneNumber({
          success: function success(res) {
            if (typeof that.props.onGetPhoneNumber === 'function') {
              resObj.detail = res;
              resObj.type = 'getphonenumber';
              that.props.onGetPhoneNumber(resObj);
            }
          },
          fail: function fail(res) {
            if (typeof that.props.onGetPhoneNumber === 'function') {
              resObj.detail = res;
              resObj.type = 'getphonenumber';
              that.props.onGetPhoneNumber(resObj);
            }
          }
        });
      }

      if (this.data.opentype === 'getAuthorize' && this.data.scope === 'userInfo') {
        my.getOpenUserInfo({
          success: function success(res) {
            if (typeof that.props.onGetUserInfo === 'function') {
              var _res = JSON.parse(res.response).response;
              _res.gender && _res.gender === 'm' ? _res.gender = 1 : _res.gender = 2;
              _res.avatarUrl = _res.avatar;
              delete _res.avatar;
              resObj.detail = {};
              resObj.detail.userInfo = _res;
              resObj.type = 'getuserinfo';
              that.props.onGetUserInfo(resObj);
            }
          },
          fail: function fail(res) {
            if (typeof that.props.onGetUserInfo === 'function') {
              resObj.detail = res;
              resObj.type = 'getuserinfo';
              that.props.onGetUserInfo(resObj);
            }
          }
        });
      }
    },
    stopEvent: function stopEvent() {},
    btnOnTap: function btnOnTap(e) {
      var that = this;
      var tapEvent = processDataSet(e, this.props);

      if (this.props.openType === 'openSetting') {
        my.openSetting({
          success: function success(res) {
            if (typeof that.props.onOpenSetting === 'function') {
              that.props.onOpenSetting(_objectSpread(_objectSpread({}, tapEvent), {}, {
                type: 'opensetting',
                detail: {
                  authSetting: utils.mapAuthSetting(res.authSetting)
                }
              }));
            }
          }
        });
      }

      this.props.catchTap && this.props.catchTap(tapEvent);
      this.props.onTap && this.props.onTap(tapEvent);
    },
    getPhone: function getPhone(e) {
      var _this2 = this;

      var eve = _objectSpread({}, e);

      my.getPhoneNumber({
        success: function success(res) {
          if (typeof res.response === 'string') {
            var response = JSON.parse(res.response);

            if (response.response.code === '40001') {
              utils.warn('请去小程序开发管理后台的功能列表中添加获取电话功能', {
                apiName: 'button/bindgetphonenumber',
                errorType: 1,
                type: 'component'
              });
            }

            return false;
          }

          eve.detail = res.response;

          if (typeof _this2.props.onGetPhoneNumber === 'function') {
            _this2.props.onGetPhoneNumber(eve);
          }
        },
        fail: function fail(err) {
          throw err;
        }
      });
    },
    getUserInfo: function getUserInfo(e) {
      var that = this; // 获取用户信息

      var eve = _objectSpread({}, e);

      my.getAuthCode({
        scopes: 'auth_user',
        success: function success() {
          my.getOpenUserInfo({
            success: function success(userInfo) {
              eve.detail = {
                userInfo: {},
                rawData: ''
              };

              if (typeof userInfo.response === 'string') {
                var response = JSON.parse(userInfo.response);

                if (response.response.code === '40006') {
                  utils.warn('请去小程序开发管理后台的功能列表中添加会员信息功能', {
                    apiName: 'button/bindgetuserinfo',
                    errorType: 1,
                    type: 'component'
                  });
                }

                return false;
              }

              eve.detail.userInfo = _objectSpread({}, userInfo.response);
              eve.detail.userInfo.avatarUrl = eve.detail.userInfo.avatar;
              delete eve.detail.userInfo.avatar;
              eve.detail.rawData = JSON.stringify(eve.detail.userInfo);

              if (typeof that.props.onGetUserInfo === 'function') {
                that.props.onGetUserInfo(eve);
              }
            },
            fail: function fail(err) {
              throw err;
            }
          });
        }
      });
    }
  }
});