"use strict";

var _component = require("../common/component");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _my = require("../../__antmove/api/index.js")(my);

var FONT_COLOR = "#ed6a0c";
var BG_COLOR = "#fffbe8";
(0, _component.VantComponent)({
  props: {
    text: {
      type: String,
      value: ""
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
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ""
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    },
    wrapable: Boolean
  },
  data: {
    show: true
  },
  watch: {
    text: function text() {
      this.set({}, this.init);
    }
  },
  created: function created() {
    this.resetAnimation = _my.createAnimation({
      duration: 0,
      timingFunction: "linear"
    });
  },
  destroyed: function destroyed() {
    this.timer && clearTimeout(this.timer);
  },
  methods: {
    init: function init() {
      var _this = this;

      Promise.all([this.getRect(".van-notice-bar__content"), this.getRect(".van-notice-bar__wrap")]).then(function (rects) {
        var _rects = _slicedToArray(rects, 2),
            contentRect = _rects[0],
            wrapRect = _rects[1];

        if (contentRect == null || wrapRect == null || !contentRect.width || !wrapRect.width) {
          return;
        }

        var _this$data = _this.data,
            speed = _this$data.speed,
            scrollable = _this$data.scrollable,
            delay = _this$data.delay;

        if (scrollable && wrapRect.width < contentRect.width) {
          var duration = contentRect.width / speed * 1000;
          _this.wrapWidth = wrapRect.width;
          _this.contentWidth = contentRect.width;
          _this.duration = duration;
          _this.animation = _my.createAnimation({
            duration: duration,
            timingFunction: "linear",
            delay: delay
          });

          _this.scroll();
        }
      });
    },
    scroll: function scroll() {
      var _this2 = this;

      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.set({
        animationData: this.resetAnimation.translateX(this.wrapWidth).step()["export"]()
      });
      setTimeout(function () {
        _this2.set({
          animationData: _this2.animation.translateX(-_this2.contentWidth).step()["export"]()
        });
      }, 20);
      this.timer = setTimeout(function () {
        _this2.scroll();
      }, this.duration);
    },
    onClickIcon: function onClickIcon() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;
      this.set({
        show: false
      });
    },
    onClick: function onClick(event) {
      this.$emit("click", event);
    }
  }
});