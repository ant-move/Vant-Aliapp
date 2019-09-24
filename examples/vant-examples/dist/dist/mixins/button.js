"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button = void 0;

function Behavior(behavior) {
  return behavior;
}

var button = Behavior({
  externalClasses: ["hover-class"],
  properties: {
    id: String,
    lang: {
      type: String,
      value: "en"
    },
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String
  }
});
exports.button = button;