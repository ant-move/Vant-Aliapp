"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  classes: ["main-item-class", "content-item-class", "main-active-class", "content-active-class", "main-disabled-class", "content-disabled-class"],
  props: {
    items: {
      type: Array,
      observer: "updateSubItems"
    },
    activeId: null,
    mainActiveIndex: {
      type: Number,
      value: 0,
      observer: "updateSubItems"
    },
    height: {
      type: [Number, String],
      value: 300
    },
    max: {
      type: Number,
      value: Infinity
    },
    selectedIcon: {
      type: String,
      value: "success"
    }
  },
  data: {
    subItems: []
  },
  methods: {
    // 当一个子项被选择时
    onSelectItem: function onSelectItem(event) {
      var item = event.currentTarget.dataset.item;
      var isArray = Array.isArray(this.data.activeId); // 判断有没有超出右侧选择的最大数

      var isOverMax = isArray && this.data.activeId.length >= this.data.max; // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件

      var isSelected = isArray ? this.data.activeId.indexOf(item.id) > -1 : this.data.activeId === item.id;

      if (!item.disabled && (!isOverMax || isSelected)) {
        this.$emit("click-item", item);
      }
    },
    // 当一个导航被点击时
    onClickNav: function onClickNav(event) {
      var index = event.detail;
      var item = this.data.items[index];

      if (!item.disabled) {
        this.$emit("click-nav", {
          index: index
        });
      }
    },
    // 更新子项列表
    updateSubItems: function updateSubItems() {
      var _this$data = this.data,
          items = _this$data.items,
          mainActiveIndex = _this$data.mainActiveIndex;

      var _ref = items[mainActiveIndex] || {},
          _ref$children = _ref.children,
          children = _ref$children === void 0 ? [] : _ref$children;

      return this.set({
        subItems: children
      });
    }
  }
});