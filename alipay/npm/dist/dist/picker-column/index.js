"use strict";

var _component = require("../common/component");

var _utils = require("../common/utils");

var DEFAULT_DURATION = 200;
(0, _component.VantComponent)({
  classes: ["active-class"],
  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    visibleItemCount: Number,
    initialOptions: {
      type: Array,
      value: []
    },
    defaultIndex: {
      type: Number,
      value: 0,
      observer: function observer(value) {
        this.setIndex(value);
      }
    }
  },
  data: {
    startY: 0,
    offset: 0,
    duration: 0,
    startOffset: 0,
    options: [],
    currentIndex: 0
  },
  created: function created() {
    var _this = this;

    var _this$data = this.data,
        defaultIndex = _this$data.defaultIndex,
        initialOptions = _this$data.initialOptions;
    this.set({
      currentIndex: defaultIndex,
      options: initialOptions
    }).then(function () {
      _this.setIndex(defaultIndex);
    });
  },
  methods: {
    getCount: function getCount() {
      return this.data.options.length;
    },
    onTouchStart: function onTouchStart(event) {
      this.setData({
        startY: event.touches[0].clientY,
        startOffset: this.data.offset,
        duration: 0
      });
    },
    onTouchMove: function onTouchMove(event) {
      var data = this.data;
      var deltaY = event.touches[0].clientY - data.startY;
      this.setData({
        offset: (0, _utils.range)(data.startOffset + deltaY, -(this.getCount() * data.itemHeight), data.itemHeight)
      });
    },
    onTouchEnd: function onTouchEnd() {
      var data = this.data;

      if (data.offset !== data.startOffset) {
        this.setData({
          duration: DEFAULT_DURATION
        });
        var index = (0, _utils.range)(Math.round(-data.offset / data.itemHeight), 0, this.getCount() - 1);
        this.setIndex(index, true);
      }
    },
    onClickItem: function onClickItem(event) {
      var index = event.currentTarget.dataset.index;
      this.setIndex(index, true);
    },
    adjustIndex: function adjustIndex(index) {
      var data = this.data;
      var count = this.getCount();
      index = (0, _utils.range)(index, 0, count);

      for (var i = index; i < count; i++) {
        if (!this.isDisabled(data.options[i])) return i;
      }

      for (var _i = index - 1; _i >= 0; _i--) {
        if (!this.isDisabled(data.options[_i])) return _i;
      }
    },
    isDisabled: function isDisabled(option) {
      return (0, _utils.isObj)(option) && option.disabled;
    },
    getOptionText: function getOptionText(option) {
      var data = this.data;
      return (0, _utils.isObj)(option) && data.valueKey in option ? option[data.valueKey] : option;
    },
    setIndex: function setIndex(index, userAction) {
      var _this2 = this;

      var data = this.data;
      index = this.adjustIndex(index) || 0;
      var offset = -index * data.itemHeight;

      if (index !== data.currentIndex) {
        return this.set({
          offset: offset,
          currentIndex: index
        }).then(function () {
          userAction && _this2.$emit("change", index);
        });
      }

      return this.set({
        offset: offset
      });
    },
    setValue: function setValue(value) {
      var options = this.data.options;

      for (var i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }

      return Promise.resolve();
    },
    getValue: function getValue() {
      var data = this.data;
      return data.options[data.currentIndex];
    }
  }
});