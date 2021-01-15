"use strict";

var _link = require("../mixins/link");

var _component = require("../common/component");

var _utils = require("../common/utils");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  relation: {
    name: "grid",
    type: "ancestor",
    current: "grid-item"
  },
  classes: ["content-class", "icon-class", "text-class"],
  mixins: [_link.link],
  props: {
    icon: String,
    iconColor: String,
    dot: Boolean,
    info: null,
    badge: null,
    text: String,
    useSlot: Boolean
  },
  data: {
    viewStyle: ""
  },
  mounted: function mounted() {
    var _this = this;

    wx.nextTick(function () {
      _this.updateStyle();
    });
  },
  methods: {
    updateStyle: function updateStyle() {
      if (!this.parent) {
        return;
      }

      var _this$parent = this.parent,
          data = _this$parent.data,
          children = _this$parent.children;
      var columnNum = data.columnNum,
          border = data.border,
          square = data.square,
          gutter = data.gutter,
          clickable = data.clickable,
          center = data.center,
          direction = data.direction,
          iconSize = data.iconSize;
      var width = "".concat(100 / columnNum, "%");
      var styleWrapper = [];
      styleWrapper.push("width: ".concat(width));

      if (square) {
        styleWrapper.push("padding-top: ".concat(width));
      }

      if (gutter) {
        var gutterValue = (0, _utils.addUnit)(gutter);
        styleWrapper.push("padding-right: ".concat(gutterValue));
        var index = children.indexOf(this);

        if (index >= columnNum && !square) {
          styleWrapper.push("margin-top: ".concat(gutterValue));
        }
      }

      var contentStyle = "";

      if (square && gutter) {
        var _gutterValue = (0, _utils.addUnit)(gutter);

        contentStyle = "\n          right: ".concat(_gutterValue, ";\n          bottom: ").concat(_gutterValue, ";\n          height: auto;\n        ");
      }

      this.setData({
        viewStyle: styleWrapper.join("; "),
        contentStyle: contentStyle,
        center: center,
        border: border,
        square: square,
        gutter: gutter,
        clickable: clickable,
        direction: direction,
        iconSize: iconSize
      });
    },
    onClick: function onClick() {
      this.$emit("click");
      this.jumpLink();
    }
  }
});