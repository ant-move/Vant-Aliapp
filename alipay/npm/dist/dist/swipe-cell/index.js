"use strict";

var _component = require("../common/component");

var _touch = require("../mixins/touch");

var _utils = require("../common/utils");

var THRESHOLD = 0.3;
var ARRAY = [];
(0, _component.VantComponent)({
  props: {
    disabled: Boolean,
    leftWidth: {
      type: Number,
      value: 0,
      observer: function observer() {
        var leftWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.offset > 0) {
          this.swipeMove(leftWidth);
        }
      }
    },
    rightWidth: {
      type: Number,
      value: 0,
      observer: function observer() {
        var rightWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        if (this.offset < 0) {
          this.swipeMove(-rightWidth);
        }
      }
    },
    asyncClose: Boolean,
    name: {
      type: [Number, String],
      value: ""
    }
  },
  mixins: [_touch.touch],
  data: {
    catchMove: false,
    wrapperStyle: ""
  },
  created: function created() {
    this.offset = 0;
    ARRAY.push(this);
  },
  destroyed: function destroyed() {
    var _this = this;

    ARRAY = ARRAY.filter(function (item) {
      return item !== _this;
    });
  },
  methods: {
    open: function open(position) {
      var _this$data = this.data,
          leftWidth = _this$data.leftWidth,
          rightWidth = _this$data.rightWidth;
      var offset = position === "left" ? leftWidth : -rightWidth;
      this.swipeMove(offset);
      this.$emit("open", {
        position: position,
        name: this.data.name
      });
    },
    close: function close() {
      this.swipeMove(0);
    },
    swipeMove: function swipeMove() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.offset = (0, _utils.range)(offset, -this.data.rightWidth, this.data.leftWidth);
      var transform = "translate3d(".concat(this.offset, "px, 0, 0)");
      var transition = this.dragging ? "none" : "transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)";
      this.setData({
        wrapperStyle: "\n        -webkit-transform: ".concat(transform, ";\n        -webkit-transition: ").concat(transition, ";\n        transform: ").concat(transform, ";\n        transition: ").concat(transition, ";\n      ")
      });
    },
    swipeLeaveTransition: function swipeLeaveTransition() {
      var _this$data2 = this.data,
          leftWidth = _this$data2.leftWidth,
          rightWidth = _this$data2.rightWidth;
      var offset = this.offset;

      if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
        this.open("right");
      } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
        this.open("left");
      } else {
        this.swipeMove(0);
      }

      this.setData({
        catchMove: false
      });
    },
    startDrag: function startDrag(event) {
      if (this.data.disabled) {
        return;
      }

      this.startOffset = this.offset;
      this.touchStart(event);
    },
    noop: function noop() {},
    onDrag: function onDrag(event) {
      var _this2 = this;

      if (this.data.disabled) {
        return;
      }

      this.touchMove(event);

      if (this.direction !== "horizontal") {
        return;
      }

      this.dragging = true;
      ARRAY.filter(function (item) {
        return item !== _this2;
      }).forEach(function (item) {
        return item.close();
      });
      this.setData({
        catchMove: true
      });
      this.swipeMove(this.startOffset + this.deltaX);
    },
    endDrag: function endDrag() {
      if (this.data.disabled) {
        return;
      }

      this.dragging = false;
      this.swipeLeaveTransition();
    },
    onClick: function onClick(event) {
      var _event$currentTarget$ = event.currentTarget.dataset.key,
          position = _event$currentTarget$ === void 0 ? "outside" : _event$currentTarget$;
      this.$emit("click", position);

      if (!this.offset) {
        return;
      }

      if (this.data.asyncClose) {
        this.$emit("close", {
          position: position,
          instance: this,
          name: this.data.name
        });
      } else {
        this.swipeMove(0);
      }
    }
  }
});