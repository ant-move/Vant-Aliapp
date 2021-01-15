"use strict";

var _component = require("../common/component");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  field: true,
  relation: {
    name: "dropdown-menu",
    type: "ancestor",
    current: "dropdown-item",
    linked: function linked() {
      this.updateDataFromParent();
    }
  },
  props: {
    value: {
      type: null,
      observer: "rerender"
    },
    title: {
      type: String,
      observer: "rerender"
    },
    disabled: Boolean,
    titleClass: {
      type: String,
      observer: "rerender"
    },
    options: {
      type: Array,
      value: [],
      observer: "rerender"
    },
    popupStyle: String
  },
  data: {
    transition: true,
    showPopup: false,
    showWrapper: false,
    displayTitle: ""
  },
  methods: {
    rerender: function rerender() {
      var _this = this;

      wx.nextTick(function () {
        _this.parent && _this.parent.updateItemListData();
      });
    },
    updateDataFromParent: function updateDataFromParent() {
      if (this.parent) {
        var _this$parent$data = this.parent.data,
            overlay = _this$parent$data.overlay,
            duration = _this$parent$data.duration,
            activeColor = _this$parent$data.activeColor,
            closeOnClickOverlay = _this$parent$data.closeOnClickOverlay,
            direction = _this$parent$data.direction;
        this.setData({
          overlay: overlay,
          duration: duration,
          activeColor: activeColor,
          closeOnClickOverlay: closeOnClickOverlay,
          direction: direction
        });
      }
    },
    onOpen: function onOpen() {
      this.$emit("open");
    },
    onOpened: function onOpened() {
      this.$emit("opened");
    },
    onClose: function onClose() {
      this.$emit("close");
    },
    onClosed: function onClosed() {
      this.$emit("closed");
      this.setData({
        showWrapper: false
      });
    },
    onOptionTap: function onOptionTap(event) {
      var option = event.currentTarget.dataset.option;
      var value = option.value;
      var shouldEmitChange = this.data.value !== value;
      this.setData({
        showPopup: false,
        value: value
      });
      this.$emit("close");
      this.rerender();

      if (shouldEmitChange) {
        this.$emit("change", value);
      }
    },
    toggle: function toggle(show) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var showPopup = this.data.showPopup;

      if (typeof show !== "boolean") {
        show = !showPopup;
      }

      if (show === showPopup) {
        return;
      }

      this.setData({
        transition: !options.immediate,
        showPopup: show
      });

      if (show) {
        this.parent.getChildWrapperStyle().then(function (wrapperStyle) {
          _this2.setData({
            wrapperStyle: wrapperStyle,
            showWrapper: true
          });

          _this2.rerender();
        });
      } else {
        this.rerender();
      }
    }
  }
});