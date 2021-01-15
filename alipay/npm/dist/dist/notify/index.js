"use strict";

var _component = require("../common/component");

var _color = require("../common/color");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  props: {
    message: String,
    background: String,
    type: {
      type: String,
      value: "danger"
    },
    color: {
      type: String,
      value: _color.WHITE
    },
    duration: {
      type: Number,
      value: 3000
    },
    zIndex: {
      type: Number,
      value: 110
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    },
    top: null
  },
  data: {
    show: false
  },
  created: function created() {
    var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
        statusBarHeight = _wx$getSystemInfoSync.statusBarHeight;

    this.setData({
      statusBarHeight: statusBarHeight
    });
  },
  methods: {
    show: function show() {
      var _this = this;

      var _this$data = this.data,
          duration = _this$data.duration,
          onOpened = _this$data.onOpened;
      clearTimeout(this.timer);
      this.setData({
        show: true
      }); // wx.nextTick(onOpened);

      onOpened();

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(function () {
          _this.hide();
        }, duration);
      }
    },
    hide: function hide() {
      var onClose = this.data.onClose;
      clearTimeout(this.timer);
      this.setData({
        show: false
      }); // wx.nextTick(onClose);

      onClose();
    },
    onTap: function onTap(event) {
      var onClick = this.data.onClick;

      if (onClick) {
        onClick(event.detail);
      }
    }
  }
});