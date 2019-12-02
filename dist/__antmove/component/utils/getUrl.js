"use strict";

var getUrl = function getUrl() {
  var pages = getCurrentPages();
  var url = pages[pages.length - 1].route;

  var _arr = url.split('/');

  var _name = _arr[_arr.length - 1];
  my.setStorageSync({
    key: '_pageMsg',
    data: {
      pageName: _name,
      pagePath: url
    }
  });
  return url;
};

module.exports = getUrl;