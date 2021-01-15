"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _page["default"])({
  data: {
    date: {
      maxRange: [],
      selectSingle: null,
      selectRange: [],
      selectMultiple: [],
      quickSelect1: null,
      quickSelect2: [],
      customColor: [],
      customConfirm: [],
      customRange: null,
      customDayText: [],
      customPosition: null
    },
    type: "single",
    round: true,
    color: undefined,
    minDate: Date.now(),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime(),
    maxRange: undefined,
    position: undefined,
    formatter: undefined,
    showConfirm: false,
    showCalendar: false,
    tiledMinDate: new Date(2012, 0, 10).getTime(),
    tiledMaxDate: new Date(2012, 2, 20).getTime(),
    confirmText: undefined,
    confirmDisabledText: undefined
  },
  onConfirm: function onConfirm(event) {
    console.log(event);
    this.setData({
      showCalendar: false
    });
    this.setData(_defineProperty({}, "date.".concat(this.data.id), event.detail));
  },
  onSelect: function onSelect(event) {
    console.log(event);
  },
  onUnselect: function onUnselect(event) {
    console.log(event);
  },
  onClose: function onClose() {
    this.setData({
      showCalendar: false
    });
  },
  onOpen: function onOpen() {
    console.log("open");
  },
  onOpened: function onOpened() {
    console.log("opened");
  },
  onClosed: function onClosed() {
    console.log("closed");
  },
  resetSettings: function resetSettings() {
    this.setData({
      round: true,
      color: null,
      minDate: Date.now(),
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime(),
      maxRange: null,
      position: "bottom",
      formatter: null,
      showConfirm: true,
      confirmText: "确定",
      confirmDisabledText: null
    });
  },
  show: function show(event) {
    this.resetSettings();
    var _event$currentTarget$ = event.currentTarget.dataset,
        type = _event$currentTarget$.type,
        id = _event$currentTarget$.id;
    var data = {
      id: id,
      type: type,
      showCalendar: true
    };

    switch (id) {
      case "quickSelect1":
      case "quickSelect2":
        data.showConfirm = false;
        break;

      case "customColor":
        data.color = "#07c160";
        break;

      case "customConfirm":
        data.confirmText = "完成";
        data.confirmDisabledText = "请选择结束时间";
        break;

      case "customRange":
        data.minDate = new Date(2010, 0, 1).getTime();
        data.maxDate = new Date(2010, 0, 31).getTime();
        break;

      case "customDayText":
        data.minDate = new Date(2010, 4, 1).getTime();
        data.maxDate = new Date(2010, 4, 31).getTime();
        data._formatter = true;
        data.formatter = this.dayFormatter;
        break;

      case "customPosition":
        data.round = false;
        data.position = "right";
        break;

      case "maxRange":
        data.maxRange = 3;
        break;
    }

    this.setData(data);
  },
  _dayFormatter: function _dayFormatter(day) {
    return this.data._formatter ? this.dayFormatter(day) : function (day) {
      return day;
    };
  },
  dayFormatter: function dayFormatter(day) {
    var month = day.date.getMonth() + 1;
    var date = day.date.getDate();

    if (month === 5) {
      if (date === 1) {
        day.topInfo = "劳动节";
      } else if (date === 4) {
        day.topInfo = "五四青年节";
      } else if (date === 11) {
        day.text = "今天";
      }
    }

    if (day.type === "start") {
      day.bottomInfo = "入店";
    } else if (day.type === "end") {
      day.bottomInfo = "离店";
    }

    return day;
  }
});