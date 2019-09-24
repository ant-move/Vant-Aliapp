"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.link = void 0;

var _my = require("../../__antmove/api/index.js")(my);

function Behavior(behavior) {
  return behavior;
}

var link = Behavior({
  properties: {
    url: String,
    linkType: {
      type: String,
      value: "navigateTo"
    }
  },
  methods: {
    jumpLink: function jumpLink() {
      var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "url";
      var url = this.data[urlKey];

      if (url) {
        _my[this.data.linkType]({
          url: url
        });
      }
    }
  }
});
exports.link = link;