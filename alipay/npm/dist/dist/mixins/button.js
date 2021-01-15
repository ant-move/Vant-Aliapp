"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button = void 0;

function Behavior(behavior) {
  behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
  return behavior;
}

var button = Behavior({
  externalClasses: ["hover-class"],
  properties: {
    id: String,
    lang: String,
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