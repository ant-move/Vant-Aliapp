"use strict";

var _component = require("../common/component");

var _utils = require("./utils");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;

function simpleTick(fn) {
  return setTimeout(fn, 30);
}

(0, _component.VantComponent)({
  props: {
    useSlot: Boolean,
    millisecond: Boolean,
    time: {
      type: Number,
      observer: "reset"
    },
    format: {
      type: String,
      value: "HH:mm:ss"
    },
    autoStart: {
      type: Boolean,
      value: true
    }
  },
  data: {
    timeData: (0, _utils.parseTimeData)(0),
    formattedTime: "0"
  },
  destroyed: function destroyed() {
    clearTimeout(this.tid);
    this.tid = null;
  },
  methods: {
    // 开始
    start: function start() {
      if (this.counting) {
        return;
      }

      this.counting = true;
      this.endTime = Date.now() + this.remain;
      this.tick();
    },
    // 暂停
    pause: function pause() {
      this.counting = false;
      clearTimeout(this.tid);
    },
    // 重置
    reset: function reset() {
      this.pause();
      this.remain = this.data.time;
      this.setRemain(this.remain);

      if (this.data.autoStart) {
        this.start();
      }
    },
    tick: function tick() {
      if (this.data.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },
    microTick: function microTick() {
      var _this = this;

      this.tid = simpleTick(function () {
        _this.setRemain(_this.getRemain());

        if (_this.remain !== 0) {
          _this.microTick();
        }
      });
    },
    macroTick: function macroTick() {
      var _this2 = this;

      this.tid = simpleTick(function () {
        var remain = _this2.getRemain();

        if (!(0, _utils.isSameSecond)(remain, _this2.remain) || remain === 0) {
          _this2.setRemain(remain);
        }

        if (_this2.remain !== 0) {
          _this2.macroTick();
        }
      });
    },
    getRemain: function getRemain() {
      return Math.max(this.endTime - Date.now(), 0);
    },
    setRemain: function setRemain(remain) {
      var _this3 = this;

      this.remain = remain;
      var timeData = (0, _utils.parseTimeData)(remain);

      if (this.data.useSlot) {
        wx.nextTick(function () {
          _this3.$emit("change", timeData);
        });
      }

      this.setData({
        formattedTime: (0, _utils.parseFormat)(this.data.format, timeData)
      });

      if (remain === 0) {
        this.pause();
        this.$emit("finish");
      }
    }
  }
});