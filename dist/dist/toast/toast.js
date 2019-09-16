"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../common/utils");

var defaultOptions = {
  type: "text",
  mask: false,
  message: "",
  show: true,
  zIndex: 1000,
  duration: 3000,
  position: "middle",
  forbidClick: false,
  loadingType: "circular",
  selector: ".van-toast"
};
var queue = [];
var currentOptions = Object.assign({}, defaultOptions);

function parseOptions(message) {
  return (0, _utils.isObj)(message) ? message : {
    message: message
  };
}

function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

function Toast(toastOptions) {
  var options = Object.assign({}, currentOptions, parseOptions(toastOptions));
  var context = options.context || getContext();
  var toast = context.selectComponent(options.selector);

  if (!toast) {
    console.warn("未找到 van-toast 节点，请确认 selector 及 context 是否正确");
    return;
  }

  delete options.context;
  delete options.selector;

  toast.clear = function () {
    toast.set({
      show: false
    });

    if (options.onClose) {
      options.onClose();
    }
  };

  queue.push(toast);
  toast.set(options);
  clearTimeout(toast.timer);

  if (options.duration > 0) {
    toast.timer = setTimeout(function () {
      toast.clear();
      queue = queue.filter(function (item) {
        return item !== toast;
      });
    }, options.duration);
  }

  return toast;
}

var createMethod = function createMethod(type) {
  return function (options) {
    return Toast(Object.assign({
      type: type
    }, parseOptions(options)));
  };
};

Toast.loading = createMethod("loading");
Toast.success = createMethod("success");
Toast.fail = createMethod("fail");

Toast.clear = function () {
  queue.forEach(function (toast) {
    toast.clear();
  });
  queue = [];
};

Toast.setDefaultOptions = function (options) {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = function () {
  currentOptions = Object.assign({}, defaultOptions);
};

var _default = Toast;
exports["default"] = _default;