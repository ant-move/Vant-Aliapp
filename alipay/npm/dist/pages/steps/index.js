"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

var _config = _interopRequireDefault(require("../../dist/_vant/icons/src/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var steps = [{
  text: "步骤一",
  desc: "描述信息"
}, {
  text: "步骤二",
  desc: "描述信息"
}, {
  text: "步骤三",
  desc: "描述信息"
}, {
  text: "步骤四",
  desc: "描述信息"
}];
(0, _page["default"])({
  data: {
    active: 1,
    steps: steps,
    customIconSteps: steps.map(function (item, index) {
      return _objectSpread(_objectSpread({}, item), {}, {
        inactiveIcon: _config["default"].outline[index],
        activeIcon: _config["default"].basic[index]
      });
    })
  },
  nextStep: function nextStep() {
    this.setData({
      active: ++this.data.active % 4
    });
  },
  onClick: function onClick(event) {
    (0, _toast["default"])("Index: ".concat(event.detail));
  }
});