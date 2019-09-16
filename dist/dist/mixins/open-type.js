"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openType = void 0;

function Behavior(behavior) {
  return behavior;
}

var openType = Behavior({
  properties: {
    openType: String
  },
  methods: {
    bindGetUserInfo: function bindGetUserInfo(event) {
      this.$emit("getuserinfo", event.detail);
    },
    bindContact: function bindContact(event) {
      this.$emit("contact", event.detail);
    },
    bindGetPhoneNumber: function bindGetPhoneNumber(event) {
      this.$emit("getphonenumber", event.detail);
    },
    bindError: function bindError(event) {
      this.$emit("error", event.detail);
    },
    bindLaunchApp: function bindLaunchApp(event) {
      this.$emit("launchapp", event.detail);
    },
    bindOpenSetting: function bindOpenSetting(event) {
      this.$emit("opensetting", event.detail);
    }
  }
});
exports.openType = openType;