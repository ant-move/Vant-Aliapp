"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptor = adaptor;

function adaptor(ctx) {
  // @ts-ignore
  return Object.assign(ctx, {
    setStrokeStyle: function setStrokeStyle(val) {
      ctx.strokeStyle = val;
    },
    setLineWidth: function setLineWidth(val) {
      ctx.lineWidth = val;
    },
    setLineCap: function setLineCap(val) {
      ctx.lineCap = val;
    },
    setFillStyle: function setFillStyle(val) {
      ctx.fillStyle = val;
    },
    setFontSize: function setFontSize(val) {
      ctx.font = String(val);
    },
    setGlobalAlpha: function setGlobalAlpha(val) {
      ctx.globalAlpha = val;
    },
    setLineJoin: function setLineJoin(val) {
      ctx.lineJoin = val;
    },
    setTextAlign: function setTextAlign(val) {
      ctx.textAlign = val;
    },
    setMiterLimit: function setMiterLimit(val) {
      ctx.miterLimit = val;
    },
    setShadow: function setShadow(offsetX, offsetY, blur, color) {
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
    },
    setTextBaseline: function setTextBaseline(val) {
      ctx.textBaseline = val;
    },
    createCircularGradient: function createCircularGradient() {},
    draw: function draw() {}
  });
}