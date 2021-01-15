"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _page["default"])({
  data: {
    show: {
      basic: false,
      withDesc: false,
      multiLine: false,
      customIcon: false
    },
    options: [{
      name: "微信",
      icon: "wechat",
      openType: "share"
    }, {
      name: "微博",
      icon: "weibo"
    }, {
      name: "复制链接",
      icon: "link"
    }, {
      name: "分享海报",
      icon: "poster"
    }, {
      name: "二维码",
      icon: "qrcode"
    }],
    multiLineOptions: [[{
      name: "微信",
      icon: "wechat"
    }, {
      name: "微博",
      icon: "weibo"
    }, {
      name: "QQ",
      icon: "qq"
    }], [{
      name: "复制链接",
      icon: "link"
    }, {
      name: "分享海报",
      icon: "poster"
    }, {
      name: "二维码",
      icon: "qrcode"
    }]],
    customIconOptions: [{
      name: "名称",
      icon: "https://img.yzcdn.cn/vant/custom-icon-fire.png"
    }, {
      name: "名称",
      icon: "https://img.yzcdn.cn/vant/custom-icon-light.png"
    }, {
      name: "名称",
      icon: "https://img.yzcdn.cn/vant/custom-icon-water.png"
    }],
    optionsWithDesc: [{
      name: "微信",
      icon: "wechat"
    }, {
      name: "微博",
      icon: "weibo"
    }, {
      name: "复制链接",
      icon: "link",
      description: "描述信息"
    }, {
      name: "分享海报",
      icon: "poster"
    }, {
      name: "二维码",
      icon: "qrcode"
    }]
  },
  onShowShareSheet: function onShowShareSheet(event) {
    this.setData(_defineProperty({}, "show.".concat(event.target.dataset.type), true));
  },
  onClose: function onClose() {
    this.setData({
      show: {
        basic: false,
        withDesc: false,
        multiLine: false,
        customIcon: false
      }
    });
  },
  onSelect: function onSelect(event) {
    (0, _toast["default"])(event.detail.name);
    this.onClose();
  }
});