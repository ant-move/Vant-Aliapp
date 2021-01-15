"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Notify;

var _color = require("../common/color");

var defaultOptions = {
  selector: "#van-notify",
  type: "danger",
  message: "",
  background: "",
  duration: 3000,
  zIndex: 110,
  top: 0,
  color: _color.WHITE,
  safeAreaInsetTop: false,
  onClick: function onClick() {},
  onOpened: function onOpened() {},
  onClose: function onClose() {}
};

function parseOptions(message) {
  if (message == null) {
    return {};
  }

  return typeof message === "string" ? {
    message: message
  } : message;
}

function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Notify(options) {
  options = Object.assign(Object.assign({}, defaultOptions), parseOptions(options));
  var context = options.context || getContext();
  var notify = context.selectComponent(options.selector);
  delete options.context;
  delete options.selector;

  if (notify) {
    notify.setData(options);
    notify.show();
    return notify;
  }

  console.warn("未找到 van-notify 节点，请确认 selector 及 context 是否正确");
}

Notify.clear = function (options) {
  options = Object.assign(Object.assign({}, defaultOptions), parseOptions(options));
  var context = options.context || getContext();
  var notify = context.selectComponent(options.selector);

  if (notify) {
    notify.hide();
  }
};