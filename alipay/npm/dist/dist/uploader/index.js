"use strict";

var _component = require("../common/component");

var _utils = require("./utils");

var _shared = require("./shared");

var _validator = require("../common/validator");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  props: Object.assign(Object.assign({
    disabled: Boolean,
    multiple: Boolean,
    uploadText: String,
    useBeforeRead: Boolean,
    afterRead: null,
    beforeRead: null,
    previewSize: {
      type: null,
      value: 80
    },
    name: {
      type: [Number, String],
      value: ""
    },
    accept: {
      type: String,
      value: "image"
    },
    fileList: {
      type: Array,
      value: [],
      observer: "formatFileList"
    },
    maxSize: {
      type: Number,
      value: Number.MAX_VALUE
    },
    maxCount: {
      type: Number,
      value: 100
    },
    deletable: {
      type: Boolean,
      value: true
    },
    showUpload: {
      type: Boolean,
      value: true
    },
    previewImage: {
      type: Boolean,
      value: true
    },
    previewFullImage: {
      type: Boolean,
      value: true
    },
    imageFit: {
      type: String,
      value: "scaleToFill"
    },
    uploadIcon: {
      type: String,
      value: "photograph"
    }
  }, _shared.chooseImageProps), _shared.chooseVideoProps),
  data: {
    lists: [],
    isInCount: true
  },
  methods: {
    formatFileList: function formatFileList() {
      var _this$data = this.data,
          _this$data$fileList = _this$data.fileList,
          fileList = _this$data$fileList === void 0 ? [] : _this$data$fileList,
          maxCount = _this$data.maxCount;
      var lists = fileList.map(function (item) {
        return Object.assign(Object.assign({}, item), {
          isImage: (0, _utils.isImageFile)(item),
          isVideo: (0, _utils.isVideoFile)(item),
          deletable: (0, _validator.isBoolean)(item.deletable) ? item.deletable : true
        });
      });
      this.setData({
        lists: lists,
        isInCount: lists.length < maxCount
      });
    },
    getDetail: function getDetail(index) {
      return {
        name: this.data.name,
        index: index == null ? this.data.fileList.length : index
      };
    },
    startUpload: function startUpload() {
      var _this = this;

      var _this$data2 = this.data,
          maxCount = _this$data2.maxCount,
          multiple = _this$data2.multiple,
          lists = _this$data2.lists,
          disabled = _this$data2.disabled;
      if (disabled) return;
      (0, _utils.chooseFile)(Object.assign(Object.assign({}, this.data), {
        maxCount: maxCount - lists.length
      })).then(function (res) {
        _this.onBeforeRead(multiple ? res : res[0]);
      })["catch"](function (error) {
        _this.$emit("error", error);
      });
    },
    onBeforeRead: function onBeforeRead(file) {
      var _this2 = this;

      var _this$data3 = this.data,
          beforeRead = _this$data3.beforeRead,
          useBeforeRead = _this$data3.useBeforeRead;
      var res = true;

      if (typeof beforeRead === "function") {
        res = beforeRead(file, this.getDetail());
      }

      if (useBeforeRead) {
        res = new Promise(function (resolve, reject) {
          _this2.$emit("before-read", Object.assign(Object.assign({
            file: file
          }, _this2.getDetail()), {
            callback: function callback(ok) {
              ok ? resolve() : reject();
            }
          }));
        });
      }

      if (!res) {
        return;
      }

      if ((0, _validator.isPromise)(res)) {
        res.then(function (data) {
          return _this2.onAfterRead(data || file);
        });
      } else {
        this.onAfterRead(file);
      }
    },
    onAfterRead: function onAfterRead(file) {
      var _this$data4 = this.data,
          maxSize = _this$data4.maxSize,
          afterRead = _this$data4.afterRead;
      var oversize = Array.isArray(file) ? file.some(function (item) {
        return item.size > maxSize;
      }) : file.size > maxSize;

      if (oversize) {
        this.$emit("oversize", Object.assign({
          file: file
        }, this.getDetail()));
        return;
      }

      if (typeof afterRead === "function") {
        afterRead(file, this.getDetail());
      }

      this.$emit("after-read", Object.assign({
        file: file
      }, this.getDetail()));
    },
    deleteItem: function deleteItem(event) {
      var index = event.currentTarget.dataset.index;
      this.$emit("delete", Object.assign(Object.assign({}, this.getDetail(index)), {
        file: this.data.fileList[index]
      }));
    },
    onPreviewImage: function onPreviewImage(event) {
      if (!this.data.previewFullImage) return;
      var index = event.currentTarget.dataset.index;
      var lists = this.data.lists;
      var item = lists[index];
      wx.previewImage({
        urls: lists.filter(function (item) {
          return (0, _utils.isImageFile)(item);
        }).map(function (item) {
          return item.url;
        }),
        current: item.url,
        fail: function fail() {
          wx.showToast({
            title: "预览图片失败",
            icon: "none"
          });
        }
      });
    },
    onPreviewVideo: function onPreviewVideo(event) {
      if (!this.data.previewFullImage) return;
      var index = event.currentTarget.dataset.index;
      var lists = this.data.lists;
      wx.previewMedia({
        sources: lists.filter(function (item) {
          return (0, _utils.isVideoFile)(item);
        }).map(function (item) {
          return Object.assign(Object.assign({}, item), {
            type: "video"
          });
        }),
        current: index,
        fail: function fail() {
          wx.showToast({
            title: "预览视频失败",
            icon: "none"
          });
        }
      });
    },
    onClickPreview: function onClickPreview(event) {
      var index = event.currentTarget.dataset.index;
      var item = this.data.lists[index];
      this.$emit("click-preview", Object.assign(Object.assign({}, item), this.getDetail(index)));
    }
  }
});