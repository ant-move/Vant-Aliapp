"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _page["default"])({
  data: {
    items: [{
      // 导航名称
      text: "所有城市",
      // 该导航下所有的可选项
      children: [].concat(_toConsumableArray(_config["default"].pro1), _toConsumableArray(_config["default"].pro2))
    }, {
      // 导航名称
      text: _config["default"].pro1Name,
      // 该导航下所有的可选项
      children: _config["default"].pro1
    }, {
      text: _config["default"].pro2Name,
      children: _config["default"].pro2
    }, {
      text: _config["default"].pro3Name,
      disabled: true,
      children: _config["default"].pro3
    }],
    mainActiveIndex: 0
  },
  onClickNav: function onClickNav(_ref) {
    var detail = _ref.detail;
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },
  onClickItem: function onClickItem(_ref2) {
    var detail = _ref2.detail;
    // 多选
    if (!this.data.activeId) this.data.activeId = [];
    var idx = this.data.activeId.indexOf(detail.id);

    if (idx > -1) {
      this.data.activeId.splice(idx, 1);
    } else {
      this.data.activeId.push(detail.id);
    }
    /*
    // 单选
    this.data.activeId = this.data.activeId === detail.id ? null : detail.id;
    */


    this.setData({
      activeId: this.data.activeId
    });
  }
});