"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImageFile = isImageFile;
exports.isVideoFile = isVideoFile;
exports.chooseFile = chooseFile;

var _utils = require("../common/utils");

var _validator = require("../common/validator");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;

function isImageFile(item) {
  if (item.isImage != null) {
    return item.isImage;
  }

  if (item.type) {
    return item.type === "image";
  }

  if (item.url) {
    return (0, _validator.isImageUrl)(item.url);
  }

  return false;
}

function isVideoFile(item) {
  if (item.isVideo != null) {
    return item.isVideo;
  }

  if (item.type) {
    return item.type === "video";
  }

  if (item.url) {
    return (0, _validator.isVideoUrl)(item.url);
  }

  return false;
}

function formatImage(res) {
  var fileInfoName = "tempFiles";
  fileInfoName = "tempFilePaths";
  return res[fileInfoName].map(function (item) {
    return Object.assign(Object.assign({}, (0, _utils.pickExclude)(item, ["path"])), {
      type: "image",
      url: item.path || item,
      thumb: item.path || item
    });
  });
}

function formatVideo(res) {
  return [Object.assign(Object.assign({}, (0, _utils.pickExclude)(res, ["tempFilePath", "thumbTempFilePath", "errMsg"])), {
    type: "video",
    url: res.tempFilePath,
    thumb: res.thumbTempFilePath
  })];
}

function formatMedia(res) {
  return res.tempFiles.map(function (item) {
    return Object.assign(Object.assign({}, (0, _utils.pickExclude)(item, ["fileType", "thumbTempFilePath", "tempFilePath"])), {
      type: res.type,
      url: item.tempFilePath,
      thumb: res.type === "video" ? item.thumbTempFilePath : item.tempFilePath
    });
  });
}

function formatFile(res) {
  return res.tempFiles.map(function (item) {
    return Object.assign(Object.assign({}, (0, _utils.pickExclude)(item, ["path"])), {
      url: item.path
    });
  });
}

function chooseFile(_ref) {
  var accept = _ref.accept,
      multiple = _ref.multiple,
      capture = _ref.capture,
      compressed = _ref.compressed,
      maxDuration = _ref.maxDuration,
      sizeType = _ref.sizeType,
      camera = _ref.camera,
      maxCount = _ref.maxCount;
  return new Promise(function (resolve, reject) {
    switch (accept) {
      case "image":
        wx.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType: sizeType,
          success: function success(res) {
            return resolve(formatImage(res));
          },
          fail: reject
        });
        break;

      case "media":
        wx.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          maxDuration: maxDuration,
          sizeType: sizeType,
          camera: camera,
          success: function success(res) {
            return resolve(formatMedia(res));
          },
          fail: reject
        });
        break;

      case "video":
        wx.chooseVideo({
          sourceType: capture,
          compressed: compressed,
          maxDuration: maxDuration,
          camera: camera,
          success: function success(res) {
            return resolve(formatVideo(res));
          },
          fail: reject
        });
        break;

      default:
        wx.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: accept,
          success: function success(res) {
            return resolve(formatFile(res));
          },
          fail: reject
        });
        break;
    }
  });
}