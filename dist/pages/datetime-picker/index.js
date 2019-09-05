"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    minHour: 10,
    maxHour: 20,
    minDate: new Date(2018, 0, 1).getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    currentDate1: new Date(2018, 2, 31).getTime(),
    currentDate2: null,
    currentDate3: new Date(2018, 0, 1),
    currentDate4: "12:00",
    loading: false,
    formatter: function formatter(type, value) {
      if (type === "year") {
        return "".concat(value, "\u5E74");
      } else if (type === "month") {
        return "".concat(value, "\u6708");
      }

      return value;
    }
  },
  onInput: function onInput(event) {
    var detail = event.detail,
        currentTarget = event.currentTarget;
    var result = this.getResult(detail, currentTarget.dataset.type);
    (0, _toast["default"])(result);
  },
  getResult: function getResult(time, type) {
    var date = new Date(time);

    switch (type) {
      case "datetime":
        return date.toLocaleString();

      case "date":
        return date.toLocaleDateString();

      case "year-month":
        return "".concat(date.getFullYear(), "/").concat(date.getMonth() + 1);

      case "time":
        return time;

      default:
        return "";
    }
  }
});