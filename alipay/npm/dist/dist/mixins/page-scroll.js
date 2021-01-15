"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageScrollMixin = void 0;

function Behavior(behavior) {
  behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
  return behavior;
}

function getCurrentPage() {
  var pages = getCurrentPages();
  return pages[pages.length - 1] || {};
}

function onPageScroll(event) {
  var _getCurrentPage = getCurrentPage(),
      _getCurrentPage$vanPa = _getCurrentPage.vanPageScroller,
      vanPageScroller = _getCurrentPage$vanPa === void 0 ? [] : _getCurrentPage$vanPa;

  vanPageScroller.forEach(function (scroller) {
    if (typeof scroller === "function") {
      // @ts-ignore
      scroller(event);
    }
  });
}

var pageScrollMixin = function pageScrollMixin(scroller) {
  return Behavior({
    attached: function attached() {
      var page = getCurrentPage();

      if (Array.isArray(page.vanPageScroller)) {
        page.vanPageScroller.push(scroller.bind(this));
      } else {
        page.vanPageScroller = typeof page.onPageScroll === "function" ? [page.onPageScroll.bind(page), scroller.bind(this)] : [scroller.bind(this)];
      }

      page.onPageScroll = onPageScroll;
    },
    detached: function detached() {
      var page = getCurrentPage();
      page.vanPageScroller = (page.vanPageScroller || []).filter(function (item) {
        return item !== scroller;
      });
    }
  });
};

exports.pageScrollMixin = pageScrollMixin;