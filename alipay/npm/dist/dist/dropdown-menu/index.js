"use strict";

var _component = require("../common/component");

var _utils = require("../common/utils");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
var ARRAY = [];
(0, _component.VantComponent)({
  field: true,
  relation: {
    name: "dropdown-item",
    type: "descendant",
    current: "dropdown-menu",
    linked: function linked() {
      this.updateItemListData();
    },
    unlinked: function unlinked() {
      this.updateItemListData();
    }
  },
  props: {
    activeColor: {
      type: String,
      observer: "updateChildrenData"
    },
    overlay: {
      type: Boolean,
      value: true,
      observer: "updateChildrenData"
    },
    zIndex: {
      type: Number,
      value: 10
    },
    duration: {
      type: Number,
      value: 200,
      observer: "updateChildrenData"
    },
    direction: {
      type: String,
      value: "down",
      observer: "updateChildrenData"
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
      observer: "updateChildrenData"
    },
    closeOnClickOutside: {
      type: Boolean,
      value: true
    }
  },
  data: {
    itemListData: []
  },
  beforeCreate: function beforeCreate() {
    var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
        windowHeight = _wx$getSystemInfoSync.windowHeight;

    this.windowHeight = windowHeight;
    ARRAY.push(this);
  },
  destroyed: function destroyed() {
    var _this = this;

    ARRAY = ARRAY.filter(function (item) {
      return item !== _this;
    });
  },
  methods: {
    updateItemListData: function updateItemListData() {
      this.setData({
        itemListData: this.children.map(function (child) {
          return child.data;
        })
      });
    },
    updateChildrenData: function updateChildrenData() {
      Array.isArray(this.children) && this.children.forEach(function (child) {
        child.updateDataFromParent();
      });
    },
    toggleItem: function toggleItem(active) {
      this.children.forEach(function (item, index) {
        var showPopup = item.data.showPopup;

        if (index === active) {
          item.toggle();
        } else if (showPopup) {
          item.toggle(false, {
            immediate: true
          });
        }
      });
    },
    close: function close() {
      this.children.forEach(function (child) {
        child.toggle(false, {
          immediate: true
        });
      });
    },
    getChildWrapperStyle: function getChildWrapperStyle() {
      var _this2 = this;

      var _this$data = this.data,
          zIndex = _this$data.zIndex,
          direction = _this$data.direction;
      return this.getRect(".van-dropdown-menu").then(function (rect) {
        var _rect$top = rect.top,
            top = _rect$top === void 0 ? 0 : _rect$top,
            _rect$bottom = rect.bottom,
            bottom = _rect$bottom === void 0 ? 0 : _rect$bottom;
        var offset = direction === "down" ? bottom : _this2.windowHeight - top;
        var wrapperStyle = "z-index: ".concat(zIndex, ";");

        if (direction === "down") {
          wrapperStyle += "top: ".concat((0, _utils.addUnit)(offset), ";");
        } else {
          wrapperStyle += "bottom: ".concat((0, _utils.addUnit)(offset), ";");
        }

        return wrapperStyle;
      });
    },
    onTitleTap: function onTitleTap(event) {
      var _this3 = this;

      var index = event.currentTarget.dataset.index;
      var child = this.children[index];

      if (!child.data.disabled) {
        ARRAY.forEach(function (menuItem) {
          if (menuItem && menuItem.data.closeOnClickOutside && menuItem !== _this3) {
            menuItem.close();
          }
        });
        this.toggleItem(index);
      }
    }
  }
});