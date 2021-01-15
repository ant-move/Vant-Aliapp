"use strict";

var _component = require("../../../common/component");

var _utils = require("../../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(0, _component.VantComponent)({
  props: {
    date: {
      type: null,
      observer: "setDays"
    },
    type: {
      type: String,
      observer: "setDays"
    },
    color: String,
    minDate: {
      type: null,
      observer: "setDays"
    },
    maxDate: {
      type: null,
      observer: "setDays"
    },
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: {
      type: null,
      observer: "setDays"
    },
    currentDate: {
      type: [null, Array],
      observer: "setDays"
    },
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean
  },
  data: {
    visible: true,
    days: []
  },
  created: function created() {
    if (this.props.onFormatter) {
      this.setDays();
    }
  },
  methods: {
    onClick: function onClick(event) {
      var index = event.currentTarget.dataset.index;
      var item = this.data.days[index];

      if (item.type !== "disabled") {
        this.$emit("click", item);
      }
    },
    setDays: function setDays() {
      var days = [];
      var startDate = new Date(this.data.date);
      var year = startDate.getFullYear();
      var month = startDate.getMonth();
      var totalDay = (0, _utils.getMonthEndDay)(startDate.getFullYear(), startDate.getMonth() + 1);

      for (var day = 1; day <= totalDay; day++) {
        var date = new Date(year, month, day);
        var type = this.getDayType(date);
        var config = {
          date: date,
          type: type,
          text: day,
          bottomInfo: this.getBottomInfo(type)
        };

        if (this.data.formatter) {
          config = this.data.formatter(config);
        }

        if (this.props.onFormatter && typeof this.props.onFormatter === "function") {
          config = this.props.onFormatter(config);
        }

        days.push(config);
      }

      this.setData({
        days: days
      });
    },
    getMultipleDayType: function getMultipleDayType(day) {
      var currentDate = this.data.currentDate;

      if (!Array.isArray(currentDate)) {
        return "";
      }

      var isSelected = function isSelected(date) {
        return currentDate.some(function (item) {
          return (0, _utils.compareDay)(item, date) === 0;
        });
      };

      if (isSelected(day)) {
        var prevDay = (0, _utils.getPrevDay)(day);
        var nextDay = (0, _utils.getNextDay)(day);
        var prevSelected = isSelected(prevDay);
        var nextSelected = isSelected(nextDay);

        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }

        if (prevSelected) {
          return "end";
        }

        return nextSelected ? "start" : "multiple-selected";
      }

      return "";
    },
    getRangeDayType: function getRangeDayType(day) {
      var _this$data = this.data,
          currentDate = _this$data.currentDate,
          allowSameDay = _this$data.allowSameDay;

      if (!Array.isArray(currentDate)) {
        return;
      }

      var _currentDate = _slicedToArray(currentDate, 2),
          startDay = _currentDate[0],
          endDay = _currentDate[1];

      if (!startDay) {
        return;
      }

      var compareToStart = (0, _utils.compareDay)(day, startDay);

      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }

      var compareToEnd = (0, _utils.compareDay)(day, endDay);

      if (compareToStart === 0 && compareToEnd === 0 && allowSameDay) {
        return "start-end";
      }

      if (compareToStart === 0) {
        return "start";
      }

      if (compareToEnd === 0) {
        return "end";
      }

      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
    },
    getDayType: function getDayType(day) {
      var _this$data2 = this.data,
          type = _this$data2.type,
          minDate = _this$data2.minDate,
          maxDate = _this$data2.maxDate,
          currentDate = _this$data2.currentDate;

      if ((0, _utils.compareDay)(day, minDate) < 0 || (0, _utils.compareDay)(day, maxDate) > 0) {
        return "disabled";
      }

      if (type === "single") {
        return (0, _utils.compareDay)(day, currentDate) === 0 ? "selected" : "";
      }

      if (type === "multiple") {
        return this.getMultipleDayType(day);
      }
      /* istanbul ignore else */


      if (type === "range") {
        return this.getRangeDayType(day);
      }
    },
    getBottomInfo: function getBottomInfo(type) {
      if (this.data.type === "range") {
        if (type === "start") {
          return "开始";
        }

        if (type === "end") {
          return "结束";
        }

        if (type === "start-end") {
          return "开始/结束";
        }
      }
    }
  }
});