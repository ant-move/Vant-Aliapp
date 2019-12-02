"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickerProps = void 0;
my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/picker/index"
  }
});
var pickerProps = {
  title: String,
  loading: Boolean,
  showToolbar: Boolean,
  cancelButtonText: {
    type: String,
    value: "取消"
  },
  confirmButtonText: {
    type: String,
    value: "确认"
  },
  visibleItemCount: {
    type: Number,
    value: 5
  },
  itemHeight: {
    type: Number,
    value: 44
  }
};
exports.pickerProps = pickerProps;