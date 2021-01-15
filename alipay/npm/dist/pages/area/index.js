"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

var _database_area = _interopRequireDefault(require("../../database_area"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db;
(0, _page["default"])({
  data: {
    areaList: {},
    loading: true,
    value: 330302
  },
  onShow: function onShow() {
    this.setData({
      loading: false,
      areaList: _database_area["default"]
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