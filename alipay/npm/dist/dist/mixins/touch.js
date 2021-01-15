"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.touch = void 0;

function Behavior(behavior) {
  behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
  return behavior;
} // @ts-nocheck


var MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return "horizontal";
  }

  if (y > x && y > MIN_DISTANCE) {
    return "vertical";
  }

  return "";
}

var touch = Behavior({
  methods: {
    resetTouchStatus: function resetTouchStatus() {
      this.direction = "";
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    touchStart: function touchStart(event) {
      this.resetTouchStatus();
      var touch = event.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
    },
    touchMove: function touchMove(event) {
      var touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
    }
  }
});
exports.touch = touch;