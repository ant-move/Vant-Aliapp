"use strict";

var _component = require("../common/component");

var _button = require("../mixins/button");

var _openType = require("../mixins/open-type");

var _color = require("../common/color");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _component.VantComponent)({
  mixins: [_button.button, _openType.openType],
  props: {
    show: {
      type: Boolean,
      value: false,
      observer: function observer(show) {
        !show && this.stopLoading();
      }
    },
    title: String,
    message: String,
    theme: {
      type: String,
      value: "default"
    },
    useSlot: Boolean,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    overlayStyle: String,
    useTitleSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    width: null,
    zIndex: {
      type: Number,
      value: 2000
    },
    confirmButtonText: {
      type: String,
      value: "确认"
    },
    cancelButtonText: {
      type: String,
      value: "取消"
    },
    confirmButtonColor: {
      type: String,
      value: _color.RED
    },
    cancelButtonColor: {
      type: String,
      value: _color.GRAY
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    overlay: {
      type: Boolean,
      value: true
    },
    transition: {
      type: String,
      value: "scale"
    }
  },
  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },
  methods: {
    onConfirm: function onConfirm() {
      this.handleAction("confirm");
    },
    onCancel: function onCancel() {
      this.handleAction("cancel");
    },
    onClickOverlay: function onClickOverlay() {
      this.onClose("overlay");
    },
    handleAction: function handleAction(action) {
      if (this.data.asyncClose) {
        this.setData(_defineProperty({}, "loading.".concat(action), true));
      }

      this.onClose(action);
    },
    close: function close() {
      this.setData({
        show: false
      });
    },
    stopLoading: function stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },
    onClose: function onClose(action) {
      if (!this.data.asyncClose) {
        this.close();
      }

      this.$emit("close", action); // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading

      this.$emit(action, {
        dialog: this
      });
      var callback = this.data[action === "confirm" ? "onConfirm" : "onCancel"];

      if (callback) {
        callback(this);
      }
    }
  }
});