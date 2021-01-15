"use strict";

var _component = require("../common/component");

var _utils = require("../common/utils");

var _color = require("../common/color");

var _canvas = require("./canvas");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;

function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}

var PERIMETER = 2 * Math.PI;
var BEGIN_ANGLE = -Math.PI / 2;
var STEP = 1;
(0, _component.VantComponent)({
  props: {
    id: {
      type: String,
      value: "van-circle"
    },
    text: String,
    lineCap: {
      type: String,
      value: "round"
    },
    value: {
      type: Number,
      value: 0,
      observer: "reRender"
    },
    speed: {
      type: Number,
      value: 50
    },
    size: {
      type: Number,
      value: 100,
      observer: function observer() {
        this.drawCircle(this.currentValue);
      }
    },
    fill: String,
    layerColor: {
      type: String,
      value: _color.WHITE
    },
    color: {
      type: [String, Object],
      value: _color.BLUE,
      observer: function observer() {
        var _this = this;

        this.setHoverColor().then(function () {
          _this.drawCircle(_this.currentValue);
        });
      }
    },
    type: {
      type: String,
      value: ""
    },
    strokeWidth: {
      type: Number,
      value: 4
    },
    clockwise: {
      type: Boolean,
      value: true
    }
  },
  data: {
    hoverColor: _color.BLUE
  },
  methods: {
    getContext: function getContext() {
      var _this2 = this;

      var _this$data = this.data,
          type = _this$data.type,
          size = _this$data.size;

      if (type === "") {
        var ctx = null;
        ctx = wx.createCanvasContext(this.props.id);
        return Promise.resolve(ctx);
      }

      var dpr = wx.getSystemInfoSync().pixelRatio;
      return new Promise(function (resolve) {
        var ctx = wx.createCanvasContext(_this2.props.id);

        if (!_this2.inited) {
          _this2.inited = true;

          _this2.setData({
            _size: size * dpr
          });

          ctx.scale(dpr, dpr);
        }

        resolve(ctx);
      });
    },
    setHoverColor: function setHoverColor() {
      var _this$data2 = this.data,
          color = _this$data2.color,
          size = _this$data2.size;
      this.hoverColor = color;
      return Promise.resolve();
    },
    presetCanvas: function presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
      var _this$data3 = this.data,
          strokeWidth = _this$data3.strokeWidth,
          lineCap = _this$data3.lineCap,
          clockwise = _this$data3.clockwise,
          size = _this$data3.size;
      var position = size / 2;
      var radius = position - strokeWidth / 2;
      context.setStrokeStyle(strokeStyle);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();

      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },
    renderLayerCircle: function renderLayerCircle(context) {
      var _this$data4 = this.data,
          layerColor = _this$data4.layerColor,
          fill = _this$data4.fill;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
    },
    renderHoverCircle: function renderHoverCircle(context, formatValue) {
      var _this$data5 = this.data,
          clockwise = _this$data5.clockwise,
          size = _this$data5.size,
          color = _this$data5.color; // 结束角度

      var progress = PERIMETER * (formatValue / 100);
      var endAngle = clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress);

      if ((0, _utils.isObj)(this.hoverColor)) {
        var LinearColor = context.createLinearGradient(size, 0, 0, 0);
        Object.keys(color).sort(function (a, b) {
          return parseFloat(a) - parseFloat(b);
        }).map(function (key) {
          LinearColor.addColorStop(parseFloat(key) / 100, color[key]);
        });
        this.hoverColor = LinearColor;
      }

      this.presetCanvas(context, this.hoverColor, BEGIN_ANGLE, endAngle);
    },
    drawCircle: function drawCircle(currentValue) {
      var _this3 = this;

      var size = this.data.size;
      this.getContext().then(function (context) {
        context.clearRect(0, 0, size, size);

        _this3.renderLayerCircle(context);

        var formatValue = format(currentValue);

        if (formatValue !== 0) {
          _this3.renderHoverCircle(context, formatValue);
        }

        context.draw();
      });
    },
    reRender: function reRender() {
      var _this4 = this;

      // tofector 动画暂时没有想到好的解决方案
      var _this$data6 = this.data,
          value = _this$data6.value,
          speed = _this$data6.speed;

      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }

      this.clearInterval();
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(function () {
        if (_this4.currentValue !== value) {
          if (_this4.currentValue < value) {
            _this4.currentValue += STEP;
          } else {
            _this4.currentValue -= STEP;
          }

          _this4.drawCircle(_this4.currentValue);
        } else {
          _this4.clearInterval();
        }
      }, 1000 / speed);
    },
    clearInterval: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    })
  },
  mounted: function mounted() {
    var _this5 = this;

    this.currentValue = this.data.value;
    this.setHoverColor().then(function () {
      _this5.drawCircle(_this5.currentValue);
    });
  },
  destroyed: function destroyed() {
    this.clearInterval();
  }
});