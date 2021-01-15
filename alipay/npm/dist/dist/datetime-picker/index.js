"use strict";

var _component = require("../common/component");

var _utils = require("../common/utils");

var _shared = require("../picker/shared");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
var currentYear = new Date().getFullYear();

function isValidDate(date) {
  return (0, _utils.isDef)(date) && !isNaN(new Date(date).getTime());
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function padZero(val) {
  return "00".concat(val).slice(-2);
}

function times(n, iteratee) {
  var index = -1;
  var result = Array(n < 0 ? 0 : n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

function getTrueValue(formattedValue) {
  if (formattedValue === undefined) {
    formattedValue = "1";
  }

  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }

  return parseInt(formattedValue, 10);
}

function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}

var defaultFormatter = function defaultFormatter(type, value) {
  return value;
};

(0, _component.VantComponent)({
  classes: ["active-class", "toolbar-class", "column-class"],
  props: Object.assign(Object.assign({}, _shared.pickerProps), {
    value: {
      type: null,
      observer: "updateValue"
    },
    filter: null,
    type: {
      type: String,
      value: "datetime",
      observer: "updateValue"
    },
    showToolbar: {
      type: Boolean,
      value: true
    },
    formatter: {
      type: null,
      value: defaultFormatter
    },
    minDate: {
      type: Number,
      value: new Date(currentYear - 10, 0, 1).getTime(),
      observer: "updateValue"
    },
    maxDate: {
      type: Number,
      value: new Date(currentYear + 10, 11, 31).getTime(),
      observer: "updateValue"
    },
    minHour: {
      type: Number,
      value: 0,
      observer: "updateValue"
    },
    maxHour: {
      type: Number,
      value: 23,
      observer: "updateValue"
    },
    minMinute: {
      type: Number,
      value: 0,
      observer: "updateValue"
    },
    maxMinute: {
      type: Number,
      value: 59,
      observer: "updateValue"
    }
  }),
  data: {
    innerValue: Date.now(),
    columns: []
  },
  methods: {
    updateValue: function updateValue() {
      var _this = this;

      var data = this.data;
      var val = this.correctValue(data.value);
      var isEqual = val === data.innerValue;

      if (!isEqual) {
        this.updateColumnValue(val).then(function () {
          _this.$emit("input", val);
        });
      } else {
        this.updateColumns();
      }
    },
    getPicker: function getPicker() {
      var _this2 = this;

      if (this.picker == null) {
        wx.nextTick(function () {
          _this2.picker = _this2.selectComponent(".van-datetime-picker");
          var picker = _this2.picker;
          var setColumnValues = picker.setColumnValues;

          picker.setColumnValues = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return setColumnValues.apply(picker, [].concat(args, [false]));
          };
        });
      }

      return this.picker;
    },
    updateColumns: function updateColumns() {
      var _this$data$formatter = this.data.formatter,
          formatter = _this$data$formatter === void 0 ? defaultFormatter : _this$data$formatter;
      var results = this.getOriginColumns().map(function (column) {
        return {
          values: column.values.map(function (value) {
            return formatter(column.type, value);
          })
        };
      });
      return this.set({
        columns: results
      });
    },
    getOriginColumns: function getOriginColumns() {
      var filter = this.data.filter;
      var results = this.getRanges().map(function (_ref) {
        var type = _ref.type,
            range = _ref.range;
        var values = times(range[1] - range[0] + 1, function (index) {
          var value = range[0] + index;
          value = type === "year" ? "".concat(value) : padZero(value);
          return value;
        });

        if (filter) {
          values = filter(type, values);
        }

        return {
          type: type,
          values: values
        };
      });
      return results;
    },
    getRanges: function getRanges() {
      var data = this.data;

      if (data.type === "time") {
        return [{
          type: "hour",
          range: [data.minHour, data.maxHour]
        }, {
          type: "minute",
          range: [data.minMinute, data.maxMinute]
        }];
      }

      var _this$getBoundary = this.getBoundary("max", data.innerValue),
          maxYear = _this$getBoundary.maxYear,
          maxDate = _this$getBoundary.maxDate,
          maxMonth = _this$getBoundary.maxMonth,
          maxHour = _this$getBoundary.maxHour,
          maxMinute = _this$getBoundary.maxMinute;

      var _this$getBoundary2 = this.getBoundary("min", data.innerValue),
          minYear = _this$getBoundary2.minYear,
          minDate = _this$getBoundary2.minDate,
          minMonth = _this$getBoundary2.minMonth,
          minHour = _this$getBoundary2.minHour,
          minMinute = _this$getBoundary2.minMinute;

      var result = [{
        type: "year",
        range: [minYear, maxYear]
      }, {
        type: "month",
        range: [minMonth, maxMonth]
      }, {
        type: "day",
        range: [minDate, maxDate]
      }, {
        type: "hour",
        range: [minHour, maxHour]
      }, {
        type: "minute",
        range: [minMinute, maxMinute]
      }];
      if (data.type === "date") result.splice(3, 2);
      if (data.type === "year-month") result.splice(2, 3);
      return result;
    },
    correctValue: function correctValue(value) {
      var data = this.data; // validate value

      var isDateType = data.type !== "time";

      if (isDateType && !isValidDate(value)) {
        value = data.minDate;
      } else if (!isDateType && !value) {
        var minHour = data.minHour;
        value = "".concat(padZero(minHour), ":00");
      } // time type


      if (!isDateType) {
        var _value$split = value.split(":"),
            _value$split2 = _slicedToArray(_value$split, 2),
            hour = _value$split2[0],
            minute = _value$split2[1];

        hour = padZero(range(hour, data.minHour, data.maxHour));
        minute = padZero(range(minute, data.minMinute, data.maxMinute));
        return "".concat(hour, ":").concat(minute);
      } // date type


      value = Math.max(value, data.minDate);
      value = Math.min(value, data.maxDate);
      return value;
    },
    getBoundary: function getBoundary(type, innerValue) {
      var _ref2;

      var value = new Date(innerValue);
      var boundary = new Date(this.data["".concat(type, "Date")]);
      var year = boundary.getFullYear();
      var month = 1;
      var date = 1;
      var hour = 0;
      var minute = 0;

      if (type === "max") {
        month = 12;
        date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
        hour = 23;
        minute = 59;
      }

      if (value.getFullYear() === year) {
        month = boundary.getMonth() + 1;

        if (value.getMonth() + 1 === month) {
          date = boundary.getDate();

          if (value.getDate() === date) {
            hour = boundary.getHours();

            if (value.getHours() === hour) {
              minute = boundary.getMinutes();
            }
          }
        }
      }

      return _ref2 = {}, _defineProperty(_ref2, "".concat(type, "Year"), year), _defineProperty(_ref2, "".concat(type, "Month"), month), _defineProperty(_ref2, "".concat(type, "Date"), date), _defineProperty(_ref2, "".concat(type, "Hour"), hour), _defineProperty(_ref2, "".concat(type, "Minute"), minute), _ref2;
    },
    onCancel: function onCancel() {
      this.$emit("cancel");
    },
    onConfirm: function onConfirm() {
      this.$emit("confirm", this.data.innerValue);
    },
    onChange: function onChange() {
      var _this3 = this;

      var data = this.data;
      var value;
      var picker = this.getPicker();
      var originColumns = this.getOriginColumns();

      if (data.type === "time") {
        var indexes = picker.getIndexes();
        value = "".concat(+originColumns[0].values[indexes[0]], ":").concat(+originColumns[1].values[indexes[1]]);
      } else {
        var _indexes = picker.getIndexes();

        var values = _indexes.map(function (value, index) {
          return originColumns[index].values[value];
        });

        var year = getTrueValue(values[0]);
        var month = getTrueValue(values[1]);
        var maxDate = getMonthEndDay(year, month);
        var date = getTrueValue(values[2]);

        if (data.type === "year-month") {
          date = 1;
        }

        date = date > maxDate ? maxDate : date;
        var hour = 0;
        var minute = 0;

        if (data.type === "datetime") {
          hour = getTrueValue(values[3]);
          minute = getTrueValue(values[4]);
        }

        value = new Date(year, month - 1, date, hour, minute);
      }

      value = this.correctValue(value);
      this.updateColumnValue(value).then(function () {
        _this3.$emit("input", value);

        _this3.$emit("change", picker);
      });
    },
    updateColumnValue: function updateColumnValue(value) {
      var _this4 = this;

      var values = [];
      var type = this.data.type;
      var formatter = this.data.formatter || defaultFormatter;
      var picker = this.getPicker();

      if (type === "time") {
        var pair = value.split(":");
        values = [formatter("hour", pair[0]), formatter("minute", pair[1])];
      } else {
        var date = new Date(value);
        values = [formatter("year", "".concat(date.getFullYear())), formatter("month", padZero(date.getMonth() + 1))];

        if (type === "date") {
          values.push(formatter("day", padZero(date.getDate())));
        }

        if (type === "datetime") {
          values.push(formatter("day", padZero(date.getDate())), formatter("hour", padZero(date.getHours())), formatter("minute", padZero(date.getMinutes())));
        }
      }

      return this.set({
        innerValue: value
      }).then(function () {
        return _this4.updateColumns();
      }).then(picker ? function () {
        return picker.setValues(values);
      } : null);
    }
  },
  created: function created() {
    var _this5 = this;

    var innerValue = this.correctValue(this.data.value);
    wx.nextTick(function () {
      _this5.updateColumnValue(innerValue).then(function () {
        _this5.$emit("input", innerValue);
      });
    });
  }
});