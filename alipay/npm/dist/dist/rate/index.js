"use strict";

var _component = require("../common/component");

var _version = require("../common/version");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  field: true,
  classes: ["icon-class"],
  props: {
    value: {
      type: Number,
      observer: function observer(value) {
        if (value !== this.data.innerValue) {
          this.setData({
            innerValue: value
          });
        }
      }
    },
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: null,
    icon: {
      type: String,
      value: "star"
    },
    voidIcon: {
      type: String,
      value: "star-o"
    },
    color: {
      type: String,
      value: "#ffd21e"
    },
    voidColor: {
      type: String,
      value: "#c7c7c7"
    },
    disabledColor: {
      type: String,
      value: "#bdbdbd"
    },
    count: {
      type: Number,
      value: 5,
      observer: function observer(value) {
        this.setData({
          innerCountArray: Array.from({
            length: value
          })
        });
      }
    },
    gutter: null,
    touchable: {
      type: Boolean,
      value: true
    }
  },
  data: {
    innerValue: 0,
    innerCountArray: Array.from({
      length: 5
    })
  },
  methods: {
    onSelect: function onSelect(event) {
      var _this = this;

      var data = this.data;
      var score = event.detail.target.dataset.score;

      if (!data.disabled && !data.readonly) {
        this.setData({
          innerValue: score + 1
        }); // if (canIUseModel()) {
        //   this.setData({ value: score + 1 });
        // }

        wx.nextTick(function () {
          _this.$emit("input", score + 1);

          _this.$emit("change", score + 1);
        });
      }
    },
    onTouchMove: function onTouchMove(event) {
      var _this2 = this;

      var touchable = this.data.touchable;
      if (!touchable) return;
      var clientX = event.touches[0].clientX;
      this.getRect(".van-rate__icon", true).then(function (list) {
        var target = list.sort(function (item) {
          return item.right - item.left;
        }).find(function (item) {
          return clientX >= item.left && clientX <= item.right;
        });

        if (target != null) {
          _this2.onSelect(Object.assign(Object.assign({}, event), {
            currentTarget: target
          }));
        }
      });
    }
  }
});