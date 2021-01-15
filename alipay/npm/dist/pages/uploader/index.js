"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _page["default"])({
  data: {
    fileList1: [],
    fileList2: [{
      url: "https://img.yzcdn.cn/vant/leaf.jpg"
    }, {
      url: "https://img.yzcdn.cn/vant/tree.jpg"
    }],
    fileList3: [{
      url: "https://img.yzcdn.cn/vant/sand.jpg"
    }],
    fileList4: [],
    fileList5: [],
    fileList6: [],
    cloudPath: [],
    fileList7: [],
    fileList8: [{
      url: "https://img.yzcdn.cn/vant/leaf.jpg",
      status: "uploading",
      message: "上传中"
    }, {
      url: "https://img.yzcdn.cn/vant/tree.jpg",
      status: "failed",
      message: "上传失败"
    }]
  },
  beforeRead: function beforeRead(event) {
    var _event$detail = event.detail,
        file = _event$detail.file,
        _event$detail$callbac = _event$detail.callback,
        callback = _event$detail$callbac === void 0 ? function () {} : _event$detail$callbac;

    if (file.path && file.path.indexOf("jpeg") < 0 || file.url && file.url.indexOf("jpeg") < 0) {
      wx.showToast({
        title: "请选择jpg图片上传",
        icon: "none"
      });
      callback(false);
      return;
    }

    callback(true);
  },
  afterRead: function afterRead(event) {
    var _event$detail2 = event.detail,
        file = _event$detail2.file,
        name = _event$detail2.name;
    console.log(JSON.stringify(file, null, 2));
    var fileList = this.data["fileList".concat(name)];
    this.setData(_defineProperty({}, "fileList".concat(name), fileList.concat(file)));
  },
  oversize: function oversize() {
    wx.showToast({
      title: "文件超出大小限制",
      icon: "none"
    });
  },
  "delete": function _delete(event) {
    var _event$detail3 = event.detail,
        index = _event$detail3.index,
        name = _event$detail3.name;
    var fileList = JSON.parse(JSON.stringify(this.data["fileList".concat(name)]));
    fileList.splice(index, 1);
    this.setData(_defineProperty({}, "fileList".concat(name), fileList));
  },
  clickPreview: function clickPreview() {},
  uploadToCloud: function uploadToCloud() {
    var _this = this;

    wx.cloud.init();
    var _this$data$fileList = this.data.fileList6,
        fileList = _this$data$fileList === void 0 ? [] : _this$data$fileList;

    if (!fileList.length) {
      wx.showToast({
        title: "请选择图片",
        icon: "none"
      });
    } else {
      var uploadTasks = fileList.map(function (file, index) {
        return _this.uploadFilePromise("my-photo".concat(index, ".png"), file);
      });
      Promise.all(uploadTasks).then(function (data) {
        wx.showToast({
          title: "上传成功",
          icon: "none"
        });
        var fileList = data.map(function (item) {
          return {
            url: item.fileID
          };
        });

        _this.setData({
          cloudPath: data,
          fileList6: fileList
        });
      })["catch"](function (e) {
        wx.showToast({
          title: "上传失败",
          icon: "none"
        });
        console.log(e);
      });
    }
  },
  uploadFilePromise: function uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.path
    });
  }
});