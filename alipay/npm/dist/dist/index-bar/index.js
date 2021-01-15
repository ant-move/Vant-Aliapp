"use strict";

var _color = require("../common/color");

var _component = require("../common/component");

var _utils = require("../common/utils");

var _pageScroll = require("../mixins/page-scroll");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;

var indexList = function indexList() {
  var list = [];
  var charCodeOfA = "A".charCodeAt(0);

  for (var i = 0; i < 26; i++) {
    list.push(String.fromCharCode(charCodeOfA + i));
  }

  return list;
};

(0, _component.VantComponent)({
  relation: {
    name: "index-anchor",
    type: "descendant",
    current: "index-bar",
    linked: function linked() {
      this.updateData();
    },
    unlinked: function unlinked() {
      this.updateData();
    }
  },
  props: {
    sticky: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    highlightColor: {
      type: String,
      value: _color.GREEN
    },
    stickyOffsetTop: {
      type: Number,
      value: 0
    },
    indexList: {
      type: Array,
      value: indexList()
    }
  },
  mixins: [(0, _pageScroll.pageScrollMixin)(function (event) {
    this.scrollTop = (event === null || event === void 0 ? void 0 : event.scrollTop) || 0;
    this.onScroll();
  })],
  data: {
    activeAnchorIndex: null,
    showSidebar: false
  },
  created: function created() {
    this.scrollTop = 0;
  },
  methods: {
    updateData: function updateData() {
      var _this = this;

      wx.nextTick(function () {
        if (_this.timer != null) {
          clearTimeout(_this.timer);
        }

        _this.timer = setTimeout(function () {
          _this.setData({
            showSidebar: !!_this.children.length
          });

          _this.setRect().then(function () {
            _this.onScroll();
          });
        }, 0);
      });
    },
    setRect: function setRect() {
      return Promise.all([this.setAnchorsRect(), this.setListRect(), this.setSiderbarRect()]);
    },
    setAnchorsRect: function setAnchorsRect() {
      var _this2 = this;

      return Promise.all(this.children.map(function (anchor) {
        return _utils.getRect.call(anchor, ".van-index-anchor-wrapper").then(function (rect) {
          if (!rect) return;
          Object.assign(anchor, {
            height: rect.height,
            top: rect.top + _this2.scrollTop
          });
        });
      }));
    },
    setListRect: function setListRect() {
      var _this3 = this;

      return _utils.getRect.call(this, ".van-index-bar").then(function (rect) {
        if (!rect) return;
        Object.assign(_this3, {
          height: rect.height,
          top: rect.top + _this3.scrollTop
        });
      });
    },
    setSiderbarRect: function setSiderbarRect() {
      var _this4 = this;

      return _utils.getRect.call(this, ".van-index-bar__sidebar").then(function (res) {
        if (!res) return;
        _this4.sidebar = {
          height: res.height,
          top: res.top
        };
      });
    },
    setDiffData: function setDiffData(_ref) {
      var target = _ref.target,
          data = _ref.data;
      var diffData = {};
      Object.keys(data).forEach(function (key) {
        if (target.data[key] !== data[key]) {
          diffData[key] = data[key];
        }
      });

      if (Object.keys(diffData).length) {
        target.setData(diffData);
      }
    },
    getAnchorRect: function getAnchorRect(anchor) {
      return _utils.getRect.call(anchor, ".van-index-anchor-wrapper").then(function (rect) {
        return {
          height: rect.height,
          top: rect.top
        };
      });
    },
    getActiveAnchorIndex: function getActiveAnchorIndex() {
      var children = this.children,
          scrollTop = this.scrollTop;
      var _this$data = this.data,
          sticky = _this$data.sticky,
          stickyOffsetTop = _this$data.stickyOffsetTop;

      for (var i = this.children.length - 1; i >= 0; i--) {
        var preAnchorHeight = i > 0 ? children[i - 1].height : 0;
        var reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;

        if (reachTop + scrollTop >= children[i].top) {
          return i;
        }
      }

      return -1;
    },
    onScroll: function onScroll() {
      var _this5 = this;

      var _this$children = this.children,
          children = _this$children === void 0 ? [] : _this$children,
          scrollTop = this.scrollTop;

      if (!children.length) {
        return;
      }

      var _this$data2 = this.data,
          sticky = _this$data2.sticky,
          stickyOffsetTop = _this$data2.stickyOffsetTop,
          zIndex = _this$data2.zIndex,
          highlightColor = _this$data2.highlightColor;
      var active = this.getActiveAnchorIndex();
      this.setDiffData({
        target: this,
        data: {
          activeAnchorIndex: active
        }
      });

      if (sticky) {
        var isActiveAnchorSticky = false;

        if (active !== -1) {
          isActiveAnchorSticky = children[active].top <= stickyOffsetTop + scrollTop;
        }

        children.forEach(function (item, index) {
          if (index === active) {
            var wrapperStyle = "";
            var anchorStyle = "\n              color: ".concat(highlightColor, ";\n            ");

            if (isActiveAnchorSticky) {
              wrapperStyle = "\n                height: ".concat(children[index].height, "px;\n              ");
              anchorStyle = "\n                position: fixed;\n                top: ".concat(stickyOffsetTop, "px;\n                z-index: ").concat(zIndex, ";\n                color: ").concat(highlightColor, ";\n              ");
            }

            _this5.setDiffData({
              target: item,
              data: {
                active: true,
                anchorStyle: anchorStyle,
                wrapperStyle: wrapperStyle
              }
            });
          } else if (index === active - 1) {
            var currentAnchor = children[index];
            var currentOffsetTop = currentAnchor.top;
            var targetOffsetTop = index === children.length - 1 ? _this5.top : children[index + 1].top;
            var parentOffsetHeight = targetOffsetTop - currentOffsetTop;
            var translateY = parentOffsetHeight - currentAnchor.height;

            var _anchorStyle = "\n              position: relative;\n              transform: translate3d(0, ".concat(translateY, "px, 0);\n              z-index: ").concat(zIndex, ";\n              color: ").concat(highlightColor, ";\n            ");

            _this5.setDiffData({
              target: item,
              data: {
                active: true,
                anchorStyle: _anchorStyle
              }
            });
          } else {
            _this5.setDiffData({
              target: item,
              data: {
                active: false,
                anchorStyle: "",
                wrapperStyle: ""
              }
            });
          }
        });
      }
    },
    onClick: function onClick(event) {
      this.scrollToAnchor(event.target.dataset.index);
    },
    onTouchMove: function onTouchMove(event) {
      var sidebarLength = this.children.length;
      var touch = event.touches[0];
      var itemHeight = this.sidebar.height / sidebarLength;
      var index = Math.floor((touch.clientY - this.sidebar.top) / itemHeight);

      if (index < 0) {
        index = 0;
      } else if (index > sidebarLength - 1) {
        index = sidebarLength - 1;
      }

      this.scrollToAnchor(index);
    },
    onTouchStop: function onTouchStop() {
      this.scrollToAnchorIndex = null;
    },
    scrollToAnchor: function scrollToAnchor(index) {
      var _this6 = this;

      if (typeof index !== "number" || this.scrollToAnchorIndex === index) {
        return;
      }

      this.scrollToAnchorIndex = index;
      var anchor = this.children.find(function (item) {
        return item.data.index === _this6.data.indexList[index];
      });

      if (anchor) {
        anchor.scrollIntoView(this.scrollTop);
        this.$emit("select", anchor.data.index);
      }
    }
  }
});