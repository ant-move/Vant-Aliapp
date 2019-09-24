"use strict";

var _Component = require("../__antmove/component/componentClass.js")("Component");

var _my = require("../__antmove/api/index.js")(my);

_Component({
  data: {
    active: 0,
    list: [{
      icon: "home-o",
      text: "tabbar示例1",
      url: "/pages/tabbar/index"
    }, {
      icon: "search",
      text: "tabbar示例2",
      url: "/pages/tabbar1/index"
    }]
  },
  methods: {
    onChange: function onChange(event) {
      this.setData({
        active: event.detail
      });

      _my.switchTab({
        url: this.data.list[event.detail].url
      });
    },
    init: function init() {
      var page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(function (item) {
          return item.url === "/".concat(page.route);
        })
      });
    }
  }
});