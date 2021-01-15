"use strict";

var _component = require("../common/component");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  classes: ["title-class", "content-class"],
  relation: {
    name: "collapse",
    type: "ancestor",
    current: "collapse-item"
  },
  props: {
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    clickable: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    isLink: {
      type: Boolean,
      value: true
    }
  },
  data: {
    expanded: false
  },
  created: function created() {
    this.animation = wx.createAnimation({
      duration: 0,
      timingFunction: "ease-in-out"
    });
  },
  mounted: function mounted() {
    var _this = this;

    wx.nextTick(function () {
      _this.updateExpanded();

      _this.inited = true;
    }, 260);
  },
  methods: {
    updateExpanded: function updateExpanded() {
      if (!this.parent) {
        return Promise.resolve();
      }

      var _this$parent$data = this.parent.data,
          value = _this$parent$data.value,
          accordion = _this$parent$data.accordion;
      var _this$parent$children = this.parent.children,
          children = _this$parent$children === void 0 ? [] : _this$parent$children;
      var name = this.data.name;
      var index = children.indexOf(this);
      var currentName = name == null ? index : name;
      var expanded = accordion ? value === currentName : (value || []).some(function (name) {
        return name === currentName;
      });

      if (expanded !== this.data.expanded) {
        this.updateStyle(expanded);
      }

      this.setData({
        index: index,
        expanded: expanded
      });
    },
    updateStyle: function updateStyle(expanded) {
      var _this2 = this;

      var inited = this.inited;
      this.getRect(".van-collapse-item__content").then(function (rect) {
        return rect.height;
      }).then(function (height) {
        var animation = _this2.animation;

        if (expanded) {
          if (height === 0) {
            animation.height("auto").top(1).step();
          } else {
            animation.height(height).top(1).step({
              duration: inited ? 300 : 1
            }).height("auto").step();
          }

          _this2.setData({
            animation: animation["export"]()
          });

          return;
        }

        animation.height(height).top(0).step({
          duration: 1
        }).height(0).step({
          duration: 300
        });

        _this2.setData({
          animation: animation["export"]()
        });
      });
    },
    onClick: function onClick() {
      if (this.data.disabled) {
        return;
      }

      var _this$data = this.data,
          name = _this$data.name,
          expanded = _this$data.expanded;
      var index = this.parent.children.indexOf(this);
      var currentName = name == null ? index : name;
      this.parent["switch"](currentName, !expanded);
    }
  }
});