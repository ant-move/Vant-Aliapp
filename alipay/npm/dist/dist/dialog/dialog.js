"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
var queue = [];
var defaultOptions = {
  show: false,
  title: "",
  width: null,
  theme: "default",
  message: "",
  zIndex: 100,
  overlay: true,
  selector: "#van-dialog",
  className: "",
  asyncClose: false,
  transition: "scale",
  customStyle: "",
  messageAlign: "",
  overlayStyle: "",
  confirmButtonText: "确认",
  cancelButtonText: "取消",
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: ""
};
var currentOptions = Object.assign({}, defaultOptions);

function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

var Dialog = function Dialog(options) {
  options = Object.assign(Object.assign({}, currentOptions), options);
  return new Promise(function (resolve, reject) {
    var context = options.context || getContext();
    var dialog = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;

    if (dialog) {
      dialog.setData(Object.assign({
        onCancel: reject,
        onConfirm: resolve
      }, options));
      wx.nextTick(function () {
        dialog.setData({
          show: true
        });
      });
      queue.push(dialog);
    } else {
      console.warn("未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
    }
  });
};

Dialog.alert = function (options) {
  return Dialog(options);
};

Dialog.confirm = function (options) {
  return Dialog(Object.assign({
    showCancelButton: true
  }, options));
};

Dialog.close = function () {
  queue.forEach(function (dialog) {
    dialog.close();
  });
  queue = [];
};

Dialog.stopLoading = function () {
  queue.forEach(function (dialog) {
    dialog.stopLoading();
  });
};

Dialog.currentOptions = currentOptions;
Dialog.defaultOptions = defaultOptions;

Dialog.setDefaultOptions = function (options) {
  currentOptions = Object.assign(Object.assign({}, currentOptions), options);
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions = function () {
  currentOptions = Object.assign({}, defaultOptions);
  Dialog.currentOptions = currentOptions;
};

Dialog.resetDefaultOptions();
var _default = Dialog;
exports["default"] = _default;