"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transition = void 0;

var _utils = require("../common/utils");

function Behavior(behavior) {
  return behavior;
}

var getClassNames = function getClassNames(name) {
  return {
    enter: "van-".concat(name, "-enter van-").concat(name, "-enter-active enter-class enter-active-class"),
    "enter-to": "van-".concat(name, "-enter-to van-").concat(name, "-enter-active enter-to-class enter-active-class"),
    leave: "van-".concat(name, "-leave van-").concat(name, "-leave-active leave-class leave-active-class"),
    "leave-to": "van-".concat(name, "-leave-to van-").concat(name, "-leave-active leave-to-class leave-active-class")
  };
};

var nextTick = function nextTick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 1000 / 30);
  });
};

var transition = function transition(showDefaultValue) {
  return Behavior({
    properties: {
      customStyle: String,
      // @ts-ignore
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: "observeShow"
      },
      // @ts-ignore
      duration: {
        type: [Number, Object],
        value: 300,
        observer: "observeDuration"
      },
      name: {
        type: String,
        value: "fade"
      }
    },
    data: {
      type: "",
      inited: false,
      display: false
    },
    attached: function attached() {
      if (this.data.show) {
        this.enter();
      }
    },
    methods: {
      observeShow: function observeShow(value) {
        if (value) {
          this.enter();
        } else {
          this.leave();
        }
      },
      enter: function enter() {
        var _this = this;

        var _this$data = this.data,
            duration = _this$data.duration,
            name = _this$data.name;
        var classNames = getClassNames(name);
        var currentDuration = (0, _utils.isObj)(duration) ? duration.leave : duration;
        this.status = "enter";
        Promise.resolve().then(nextTick).then(function () {
          _this.checkStatus("enter");

          _this.set({
            inited: true,
            display: true,
            classes: classNames.enter,
            currentDuration: currentDuration
          });
        }).then(nextTick).then(function () {
          _this.checkStatus("enter");

          _this.set({
            classes: classNames["enter-to"]
          });
        })["catch"](function () {});
      },
      leave: function leave() {
        var _this2 = this;

        var _this$data2 = this.data,
            duration = _this$data2.duration,
            name = _this$data2.name;
        var classNames = getClassNames(name);
        var currentDuration = (0, _utils.isObj)(duration) ? duration.leave : duration;
        this.status = "leave";
        Promise.resolve().then(nextTick).then(function () {
          _this2.checkStatus("leave");

          _this2.set({
            classes: classNames.leave,
            currentDuration: currentDuration
          });
        }).then(function () {
          return setTimeout(function () {
            return _this2.onTransitionEnd();
          }, currentDuration);
        }).then(nextTick).then(function () {
          _this2.checkStatus("leave");

          _this2.set({
            classes: classNames["leave-to"]
          });
        })["catch"](function () {});
      },
      checkStatus: function checkStatus(status) {
        if (status !== this.status) {
          throw new Error("incongruent status: ".concat(status));
        }
      },
      onTransitionEnd: function onTransitionEnd() {
        if (!this.data.show) {
          this.set({
            display: false
          });
          this.$emit("transitionEnd");
        }
      }
    }
  });
};

exports.transition = transition;