"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  data: {
    areaList: {},
    loading: true,
    value: 330302
  },
  onShow: function onShow() {
    var _this = this;

    _my.request({
      url: "https://cashier.youzan.com/wsctrade/uic/address/getAllRegion.json",
      success: function success(response) {
        _this.setData({
          loading: false,
          areaList: response.data.data
        });
      }
    });
  },
  onChange: function onChange(event) {
    var values = event.detail.values;
    (0, _toast["default"])(values.map(function (item) {
      return item.name;
    }).join("-"));
  },
  onConfirm: function onConfirm(event) {
    console.log(event);
  },
  onCancel: function onCancel(event) {
    console.log(event);
  }
});