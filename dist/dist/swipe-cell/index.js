"use strict";

var _component = require("../common/component");

var _touch = require("../mixins/touch");

var THRESHOLD = 0.3;
(0, _component.VantComponent)({
  props: {
    disabled: Boolean,
    leftWidth: {
      type: Number,
      value: 0
    },
    rightWidth: {
      type: Number,
      value: 0
    },
    asyncClose: Boolean
  },
  mixins: [_touch.touch],
  data: {
    catchMove: false
  },
  created: function created() {
    this.offset = 0;
  },
  methods: {
    open: function open(position) {
      var _this$data = this.data,
          leftWidth = _this$data.leftWidth,
          rightWidth = _this$data.rightWidth;
      var offset = position === "left" ? leftWidth : -rightWidth;
      this.swipeMove(offset);
    },
    close: function close() {
      this.swipeMove(0);
    },
    swipeMove: function swipeMove() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.offset = offset;
      var transform = "translate3d(".concat(offset, "px, 0, 0)");
      var transition = this.draging ? "none" : ".6s cubic-bezier(0.18, 0.89, 0.32, 1)";
      this.set({
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

      this.set({
        catchMove: false
      });
    },
    startDrag: function startDrag(event) {
      if (this.data.disabled) {
        return;
      }

      this.draging = true;
      this.startOffset = this.offset;
      this.firstDirection = "";
      this.touchStart(event);
    },
    noop: function noop() {},
    onDrag: function onDrag(event) {
      if (this.data.disabled) {
        return;
      }

      this.touchMove(event);

      if (!this.firstDirection) {
        this.firstDirection = this.direction;
        this.set({
          catchMove: this.firstDirection === "horizontal"
        });
      }

      if (this.firstDirection === "vertical") {
        return;
      }

      var _this$data3 = this.data,
          leftWidth = _this$data3.leftWidth,
          rightWidth = _this$data3.rightWidth;
      var offset = this.startOffset + this.deltaX;

      if (rightWidth > 0 && -offset > rightWidth || leftWidth > 0 && offset > leftWidth) {
        return;
      }

      this.swipeMove(offset);
    },
    endDrag: function endDrag() {
      if (this.data.disabled) {
        return;
      }

      this.draging = false;
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
          instance: this
        });
      } else {
        this.swipeMove(0);
      }
    }
  }
});