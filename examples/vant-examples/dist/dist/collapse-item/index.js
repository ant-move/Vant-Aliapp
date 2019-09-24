"use strict";

var _component = require("../common/component");

var nextTick = function nextTick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 20);
  });
};

(0, _component.VantComponent)({
  classes: ["title-class", "content-class"],
  relation: {
    name: "collapse",
    type: "ancestor",
    linked: function linked(parent) {
      this.parent = parent;
    }
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
    contentHeight: 0,
    expanded: false,
    transition: false,
    itemId: 0,
    theId: 0
  },
  mounted: function mounted() {
    var _this = this;

    this.updateExpanded().then(nextTick).then(function () {
      var data = {
        transition: true
      };

      if (_this.data.expanded) {
        data.contentHeight = "auto";
      }

      _this.set(data);
    });
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
      var stack = [];

      if (expanded !== this.data.expanded) {
        stack.push(this.updateStyle(expanded));
      }

      stack.push(this.set({
        index: index,
        expanded: expanded
      }));
      return Promise.all(stack);
    },
    updateStyle: function updateStyle(expanded) {
      var _this2 = this;

      var id = this.data.theId || 0;
      return this.getRect(".van-collapse-item__content_" + id).then(function (rect) {
        return rect.height;
      }).then(function (height) {
        if (expanded) {
          return _this2.set({
            contentHeight: height ? "".concat(height, "px") : "auto"
          });
        }

        return _this2.set({
          contentHeight: "".concat(height, "px")
        }).then(nextTick).then(function () {
          return _this2.set({
            contentHeight: 0
          });
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
    },
    onTransitionEnd: function onTransitionEnd() {
      if (this.data.expanded) {
        this.set({
          contentHeight: "auto"
        });
      }
    }
  }
});