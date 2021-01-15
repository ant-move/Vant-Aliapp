"use strict";

var _component = require("../common/component");

var _utils = require("../common/utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  props: {
    text: {
      type: String,
      value: "",
      observer: function observer() {
        var _this = this;

        wx.nextTick(function () {
          _this.init();
        });
      }
    },
    mode: {
      type: String,
      value: ""
    },
    url: {
      type: String,
      value: ""
    },
    openType: {
      type: String,
      value: "navigate"
    },
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 50,
      observer: function observer() {
        var _this2 = this;

        wx.nextTick(function () {
          _this2.init();
        });
      }
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ""
    },
    color: String,
    backgroundColor: String,
    background: String,
    wrapable: Boolean
  },
  data: {
    show: true
  },
  created: function created() {
    this.resetAnimation = wx.createAnimation({
      duration: 1,
      timingFunction: "linear"
    });
  },
  destroyed: function destroyed() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    init: function init() {
      var _this3 = this;

      Promise.all([_utils.getRect.call(this, ".van-notice-bar__content"), _utils.getRect.call(this, ".van-notice-bar__wrap")]).then(function (rects) {
        var _rects = _slicedToArray(rects, 2),
            contentRect = _rects[0],
            wrapRect = _rects[1];

        if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
          return;
        }

        var _this3$data = _this3.data,
            speed = _this3$data.speed,
            scrollable = _this3$data.scrollable,
            delay = _this3$data.delay;

        if (scrollable || wrapRect.width < contentRect.width) {
          var duration = contentRect.width / speed * 1000;
          _this3.wrapWidth = wrapRect.width;
          _this3.contentWidth = contentRect.width;
          _this3.duration = duration;
          _this3.animation = wx.createAnimation({
            duration: duration,
            timingFunction: "linear",
            delay: delay
          });

          _this3.scroll();
        }
      });
    },
    scroll: function scroll() {
      var _this4 = this;

      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.setData({
        animationData: this.resetAnimation.translateX(this.wrapWidth).step()["export"]()
      });
      (0, _utils.requestAnimationFrame)(function () {
        _this4.setData({
          animationData: _this4.animation.translateX(-_this4.contentWidth).step()["export"]()
        });
      });
      this.timer = setTimeout(function () {
        _this4.scroll();
      }, this.duration);
    },
    onClickIcon: function onClickIcon(event) {
      if (this.data.mode === "closeable") {
        this.timer && clearTimeout(this.timer);
        this.timer = null;
        this.setData({
          show: false
        });
        this.$emit("close", event.detail);
      }
    },
    onClick: function onClick(event) {
      this.$emit("click", event);
    }
  }
});