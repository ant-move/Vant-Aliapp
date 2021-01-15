"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexList = [];
var charCodeOfA = "A".charCodeAt(0);

for (var i = 0; i < 26; i++) {
  indexList.push(String.fromCharCode(charCodeOfA + i));
}

(0, _page["default"])({
  data: {
    activeTab: 0,
    indexList: indexList,
    customIndexList: [1, 2, 3, 4, 5, 6, 8, 9, 10],
    scrollTop: 0
  },
  onChange: function onChange(event) {
    this.setData({
      activeTab: event.detail.name
    });
  },
  onPageScroll: function onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  }
});