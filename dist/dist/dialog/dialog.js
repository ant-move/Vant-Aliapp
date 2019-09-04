"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var queue = [];

function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

var Dialog = function Dialog(options) {
  options = Object.assign({}, Dialog.currentOptions, options);
  return new Promise(function (resolve, reject) {
    var context = options.context || getContext();
    var dialog = context.selectComponent(options.selector);
    delete options.context;
    delete options.selector;

    if (dialog) {
      dialog.set(Object.assign({
        onCancel: reject,
        onConfirm: resolve
      }, options));
      queue.push(dialog);
    } else {
      console.warn("未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
    }
  });
};

Dialog.defaultOptions = {
  show: true,
  title: "",
  message: "",
  zIndex: 100,
  overlay: true,
  className: "",
  customStyle: "",
  asyncClose: false,
  messageAlign: "",
  transition: "scale",
  selector: ".myvan-dialog",
  confirmButtonText: "确认",
  cancelButtonText: "取消",
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: ""
};
Dialog.alert = Dialog;

Dialog.confirm = function (options) {
  return Dialog(Object.assign({
    showCancelButton: true
  }, options));
};

Dialog.close = function () {
  queue.forEach(function (dialog) {
    dialog.close();
    dialog.stopLoading();
  });
  queue = [];
};

Dialog.stopLoading = function () {
  queue.forEach(function (dialog) {
    dialog.stopLoading();
  });
};

Dialog.setDefaultOptions = function (options) {
  Object.assign(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = function () {
  Dialog.currentOptions = Object.assign({}, Dialog.defaultOptions);
};

Dialog.resetDefaultOptions();
var _default = Dialog;
exports["default"] = _default;