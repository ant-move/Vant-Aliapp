"use strict";

var _component = require("../common/component");

var _touch = require("../mixins/touch");

var _utils = require("../common/utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _component.VantComponent)({
  mixins: [_touch.touch],
  classes: ["nav-class", "tab-class", "tab-active-class", "line-class"],
  relation: {
    name: "tab",
    type: "descendant",
    linked: function linked(child) {
      this.child.push(child);
      this.updateTabs(this.data.tabs.concat(child.data));
    },
    unlinked: function unlinked(child) {
      var index = this.child.indexOf(child);
      var tabs = this.data.tabs;
      tabs.splice(index, 1);
      this.child.splice(index, 1);
      this.updateTabs(tabs);
    }
  },
  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lineWidth: {
      type: Number,
      value: -1
    },
    lineHeight: {
      type: Number,
      value: -1
    },
    active: {
      type: Number,
      value: 0
    },
    type: {
      type: String,
      value: "line"
    },
    border: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 0.3
    },
    zIndex: {
      type: Number,
      value: 1
    },
    swipeThreshold: {
      type: Number,
      value: 4
    },
    offsetTop: {
      type: Number,
      value: 0
    }
  },
  data: {
    tabs: [],
    lineStyle: "",
    scrollLeft: 0,
    scrollable: false,
    trackStyle: "",
    wrapStyle: "",
    position: ""
  },
  watch: {
    swipeThreshold: function swipeThreshold() {
      this.set({
        scrollable: this.child.length > this.data.swipeThreshold
      });
    },
    color: "setLine",
    lineWidth: "setLine",
    lineHeight: "setLine",
    active: "setActiveTab",
    animated: "setTrack",
    offsetTop: "setWrapStyle"
  },
  beforeCreate: function beforeCreate() {
    this.child = [];
  },
  mounted: function mounted() {
    var _this = this;

    this.setLine(true);
    this.setTrack();
    this.scrollIntoView();
    this.getRect(".van-tabs__wrap").then(function (rect) {
      _this.navHeight = rect.height;

      _this.observerContentScroll();
    });
  },
  destroyed: function destroyed() {
    // @ts-ignore
    this.createIntersectionObserver().disconnect();
  },
  methods: {
    updateTabs: function updateTabs(tabs) {
      tabs = tabs || this.child.map(function (c) {
        return c.data;
      });
      this.set({
        tabs: tabs,
        scrollable: tabs.length > this.data.swipeThreshold
      });
      this.setActiveTab();
    },
    trigger: function trigger(eventName, index) {
      this.$emit(eventName, {
        index: index,
        title: this.data.tabs[index].title
      });
    },
    onTap: function onTap(event) {
      var index = event.currentTarget.dataset.index;

      if (this.data.tabs[index].disabled) {
        this.trigger("disabled", index);
      } else {
        this.trigger("click", index);
        this.setActive(index);
      }
    },
    setActive: function setActive(active) {
      if (active !== this.data.active) {
        this.trigger("change", active);
        this.set({
          active: active
        });
        this.setActiveTab();
      }
    },
    setLine: function setLine(skipTransition) {
      var _this2 = this;

      if (this.data.type !== "line") {
        return;
      }

      var _this$data = this.data,
          color = _this$data.color,
          active = _this$data.active,
          duration = _this$data.duration,
          lineWidth = _this$data.lineWidth,
          lineHeight = _this$data.lineHeight;
      var num = Number(new Date());
      this.setData({
        num: num
      });
      this.getRect(".vant_tabs_".concat(this.data.num), true).then(function (rects) {
        var rect = rects[active];
        if (!rect) return false;
        var width = lineWidth !== -1 ? lineWidth : rect.width / 2;
        var height = lineHeight !== -1 ? "height: ".concat(lineHeight, "px;") : "";
        var left = rects.slice(0, active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);
        left += (rect.width - width) / 2;
        var transition = skipTransition ? "" : "transition-duration: ".concat(duration, "s; -webkit-transition-duration: ").concat(duration, "s;");

        _this2.set({
          lineStyle: "\n            ".concat(height, "\n            width: ").concat(width, "px;\n            background-color: ").concat(color, ";\n            -webkit-transform: translateX(").concat(left, "px);\n            transform: translateX(").concat(left, "px);\n            ").concat(transition, "\n          ")
        });
      });
    },
    setTrack: function setTrack() {
      var _this3 = this;

      var _this$data2 = this.data,
          animated = _this$data2.animated,
          active = _this$data2.active,
          duration = _this$data2.duration;
      if (!animated) return "";
      this.getRect(".van-tabs__content").then(function (rect) {
        var width = rect.width;

        _this3.set({
          trackStyle: "\n            width: ".concat(width * _this3.child.length, "px;\n            left: ").concat(-1 * active * width, "px;\n            transition: left ").concat(duration, "s;\n            display: -webkit-box;\n            display: flex;\n          ")
        });

        var props = {
          width: width,
          animated: animated
        };

        _this3.child.forEach(function (item) {
          item.set(props);
        });
      });
    },
    setActiveTab: function setActiveTab() {
      var _this4 = this;

      if (!this.child) return false;
      this.child.forEach(function (item, index) {
        var data = {
          active: index === _this4.data.active
        };

        if (data.active) {
          data.inited = true;
        }

        if (data.active !== item.data.active) {
          item.set(data);
        }
      });
      (0, _utils.nextTick)(function () {
        _this4.setLine();

        _this4.setTrack();

        _this4.scrollIntoView();
      });
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView() {
      var _this5 = this;

      var _this$data3 = this.data,
          active = _this$data3.active,
          scrollable = _this$data3.scrollable;

      if (!scrollable) {
        return;
      }

      Promise.all([this.getRect(".van-tab", true), this.getRect(".van-tabs__nav")]).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            tabRects = _ref2[0],
            navRect = _ref2[1];

        var tabRect = tabRects[active];
        var offsetLeft = tabRects.slice(0, active).reduce(function (prev, curr) {
          return prev + curr.width;
        }, 0);

        _this5.set({
          scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
        });
      });
    },
    onTouchStart: function onTouchStart(event) {
      if (!this.data.swipeable) return;
      this.touchStart(event);
    },
    onTouchMove: function onTouchMove(event) {
      if (!this.data.swipeable) return;
      this.touchMove(event);
    },
    // watch swipe touch end
    onTouchEnd: function onTouchEnd() {
      if (!this.data.swipeable) return;
      var _this$data4 = this.data,
          active = _this$data4.active,
          tabs = _this$data4.tabs;
      var direction = this.direction,
          deltaX = this.deltaX,
          offsetX = this.offsetX;
      var minSwipeDistance = 50;

      if (direction === "horizontal" && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && active !== 0) {
          this.setActive(active - 1);
        } else if (deltaX < 0 && active !== tabs.length - 1) {
          this.setActive(active + 1);
        }
      }
    },
    setWrapStyle: function setWrapStyle() {
      var _this$data5 = this.data,
          offsetTop = _this$data5.offsetTop,
          position = _this$data5.position;
      var wrapStyle;

      switch (position) {
        case "top":
          wrapStyle = "\n            top: ".concat(offsetTop, "px;\n            position: fixed;\n          ");
          break;

        case "bottom":
          wrapStyle = "\n            top: auto;\n            bottom: 0;\n          ";
          break;

        default:
          wrapStyle = "";
      } // cut down `set`


      if (wrapStyle === this.data.wrapStyle) return;
      this.set({
        wrapStyle: wrapStyle
      });
    },
    observerContentScroll: function observerContentScroll() {
      var _this6 = this;

      if (!this.data.sticky) {
        return;
      }

      var offsetTop = this.data.offsetTop;

      var _my$getSystemInfoSync = _my.getSystemInfoSync(),
          windowHeight = _my$getSystemInfoSync.windowHeight; // @ts-ignore


      this.createIntersectionObserver().disconnect(); // @ts-ignore

      this.createIntersectionObserver().relativeToViewport({
        top: -(this.navHeight + offsetTop)
      }).observe(".van-tabs", function (res) {
        var top = res.boundingClientRect.top;

        if (top > offsetTop) {
          return;
        }

        var position = res.intersectionRatio > 0 ? "top" : "bottom";

        _this6.$emit("scroll", {
          scrollTop: top + offsetTop,
          isFixed: position === "top"
        });

        _this6.setPosition(position);
      }); // @ts-ignore

      this.createIntersectionObserver().relativeToViewport({
        bottom: -(windowHeight - 1 - offsetTop)
      }).observe(".van-tabs", function (res) {
        var _res$boundingClientRe = res.boundingClientRect,
            top = _res$boundingClientRe.top,
            bottom = _res$boundingClientRe.bottom;

        if (bottom < _this6.navHeight) {
          return;
        }

        var position = res.intersectionRatio > 0 ? "top" : "";

        _this6.$emit("scroll", {
          scrollTop: top + offsetTop,
          isFixed: position === "top"
        });

        _this6.setPosition(position);
      });
    },
    setPosition: function setPosition(position) {
      var _this7 = this;

      if (position !== this.data.position) {
        this.set({
          position: position
        }).then(function () {
          _this7.setWrapStyle();
        });
      }
    }
  }
});