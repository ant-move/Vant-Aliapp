"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var items = [{
  text: _config["default"].pro1Name,
  children: _config["default"].pro1
}, {
  text: _config["default"].pro2Name,
  children: _config["default"].pro2
}, {
  text: _config["default"].pro3Name,
  disabled: true,
  children: _config["default"].pro3
}];
(0, _page["default"])({
  data: {
    items: items,
    badgeItems: items.slice(0, 2).map(function (item, index) {
      if (index === 0) {
        return _objectSpread(_objectSpread({}, item), {}, {
          dot: true
        });
      }

      if (index === 1) {
        return _objectSpread(_objectSpread({}, item), {}, {
          badge: 5
        });
      }

      return item;
    }),
    mainActiveIndex: 0,
    activeId: 0,
    mainActiveIndexMulti: 0,
    activeIdMulti: []
  },
  onClickNav: function onClickNav(_ref) {
    var detail = _ref.detail;
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },
  onClickItem: function onClickItem(_ref2) {
    var detail = _ref2.detail;
    var activeId = this.data.activeId === detail.id ? null : detail.id;
    this.setData({
      activeId: activeId
    });
  },
  onClickNavMulti: function onClickNavMulti(_ref3) {
    var detail = _ref3.detail;
    this.setData({
      mainActiveIndexMulti: detail.index || 0
    });
  },
  onClickItemMulti: function onClickItemMulti(_ref4) {
    var detail = _ref4.detail;
    var activeIdMulti = this.data.activeIdMulti;
    var idx = activeIdMulti.indexOf(detail.id);

    if (idx > -1) {
      activeIdMulti.splice(idx, 1);
    } else {
      activeIdMulti.push(detail.id);
    }

    this.$spliceData({
      activeIdMulti: activeIdMulti
    });
  }
});