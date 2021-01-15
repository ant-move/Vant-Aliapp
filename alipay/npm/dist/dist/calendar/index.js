"use strict";

var _component = require("../common/component");

var _utils = require("./utils");

var _toast = _interopRequireDefault(require("../toast/toast"));

var _utils2 = require("../common/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  props: {
    title: {
      type: String,
      value: "日期选择"
    },
    color: String,
    show: {
      type: Boolean,
      observer: function observer(val) {
        if (val) {
          this.initRect();
          this.scrollIntoView();
        }
      }
    },
    formatter: null,
    confirmText: {
      type: String,
      value: "确定"
    },
    rangePrompt: String,
    defaultDate: {
      type: [Number, Array],
      observer: function observer(val) {
        this.setData({
          currentDate: val
        });
        this.scrollIntoView();
      }
    },
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      value: "single",
      observer: "reset"
    },
    minDate: {
      type: null,
      value: Date.now()
    },
    maxDate: {
      type: null,
      value: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
    },
    position: {
      type: String,
      value: "bottom"
    },
    rowHeight: {
      type: [Number, String],
      value: _utils.ROW_HEIGHT
    },
    round: {
      type: Boolean,
      value: true
    },
    poppable: {
      type: Boolean,
      value: true
    },
    showMark: {
      type: Boolean,
      value: true
    },
    showTitle: {
      type: Boolean,
      value: true
    },
    showConfirm: {
      type: Boolean,
      value: true
    },
    showSubtitle: {
      type: Boolean,
      value: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    maxRange: {
      type: [Number, String],
      value: null
    }
  },
  data: {
    subtitle: "",
    currentDate: null,
    scrollIntoView: ""
  },
  created: function created() {
    this.setData({
      currentDate: this.getInitialDate()
    });
  },
  mounted: function mounted() {
    if (this.data.show || !this.data.poppable) {
      this.initRect();
      this.scrollIntoView();
    }
  },
  methods: {
    onFormatter: function onFormatter(opts) {
      return this.props.onFormatter ? this.props.onFormatter(opts) : opts;
    },
    reset: function reset() {
      this.setData({
        currentDate: this.getInitialDate()
      });
      this.scrollIntoView();
    },
    initRect: function initRect() {
      var _this = this;

      if (this.contentObserver != null) {
        this.contentObserver.disconnect();
      }

      var contentObserver = this.createIntersectionObserver({
        thresholds: [0, 0.1, 0.9, 1],
        observeAll: true
      });
      this.contentObserver = contentObserver;
      contentObserver.relativeTo(".van-calendar__body");
      contentObserver.observe(".month", function (res) {
        if (res.boundingClientRect.top <= res.relativeRect.top) {
          // @ts-ignore
          _this.setData({
            subtitle: (0, _utils.formatMonthTitle)(res.dataset.date)
          });
        }
      });
    },
    getInitialDate: function getInitialDate() {
      var _this$data = this.data,
          type = _this$data.type,
          defaultDate = _this$data.defaultDate,
          minDate = _this$data.minDate;

      if (type === "range") {
        var _ref = defaultDate || [],
            _ref2 = _slicedToArray(_ref, 2),
            startDay = _ref2[0],
            endDay = _ref2[1];

        return [startDay || minDate, endDay || (0, _utils.getNextDay)(new Date(minDate)).getTime()];
      }

      if (type === "multiple") {
        return defaultDate || [minDate];
      }

      return defaultDate || minDate;
    },
    scrollIntoView: function scrollIntoView() {
      var _this2 = this;

      (0, _utils2.requestAnimationFrame)(function () {
        var _this2$data = _this2.data,
            currentDate = _this2$data.currentDate,
            type = _this2$data.type,
            show = _this2$data.show,
            poppable = _this2$data.poppable,
            minDate = _this2$data.minDate,
            maxDate = _this2$data.maxDate; // @ts-ignore

        var targetDate = type === "single" ? currentDate : currentDate[0];
        var displayed = show || !poppable;

        if (!targetDate || !displayed) {
          return;
        }

        var months = (0, _utils.getMonths)(minDate, maxDate);
        months.some(function (month, index) {
          if ((0, _utils.compareMonth)(month, targetDate) === 0) {
            _this2.setData({
              scrollIntoView: "month".concat(index)
            });

            return true;
          }

          return false;
        });
      });
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
    },
    onClickDay: function onClickDay(event) {
      var date = event.detail.date;
      var _this$data2 = this.data,
          type = _this$data2.type,
          currentDate = _this$data2.currentDate,
          allowSameDay = _this$data2.allowSameDay;

      if (type === "range") {
        // @ts-ignore
        var _currentDate = _slicedToArray(currentDate, 2),
            startDay = _currentDate[0],
            endDay = _currentDate[1];

        if (startDay && !endDay) {
          var compareToStart = (0, _utils.compareDay)(date, startDay);

          if (compareToStart === 1) {
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (allowSameDay) {
            this.select([date, date]);
          }
        } else {
          this.select([date, null]);
        }
      } else if (type === "multiple") {
        var selectedIndex; // @ts-ignore

        var selected = currentDate.some(function (dateItem, index) {
          var equal = (0, _utils.compareDay)(dateItem, date) === 0;

          if (equal) {
            selectedIndex = index;
          }

          return equal;
        });

        if (selected) {
          // @ts-ignore
          var cancelDate = currentDate.splice(selectedIndex, 1);
          this.setData({
            currentDate: currentDate
          });
          this.unselect(cancelDate);
        } else {
          // @ts-ignore
          this.select([].concat(_toConsumableArray(currentDate), [date]));
        }
      } else {
        this.select(date, true);
      }
    },
    unselect: function unselect(dateArray) {
      var date = dateArray[0];

      if (date) {
        this.$emit("unselect", (0, _utils.copyDates)(date));
      }
    },
    select: function select(date, complete) {
      if (complete && this.data.type === "range") {
        var valid = this.checkRange(date);

        if (!valid) {
          // auto selected to max range if showConfirm
          if (this.data.showConfirm) {
            this.emit([date[0], (0, _utils.getDayByOffset)(date[0], this.data.maxRange - 1)]);
          } else {
            this.emit(date);
          }

          return;
        }
      }

      this.emit(date);

      if (complete && !this.data.showConfirm) {
        this.onConfirm();
      }
    },
    emit: function emit(date) {
      var getTime = function getTime(date) {
        return date instanceof Date ? date.getTime() : date;
      };

      this.setData({
        currentDate: Array.isArray(date) ? date.map(getTime) : getTime(date)
      });
      this.$emit("select", (0, _utils.copyDates)(date));
    },
    checkRange: function checkRange(date) {
      var _this$data3 = this.data,
          maxRange = _this$data3.maxRange,
          rangePrompt = _this$data3.rangePrompt;

      if (maxRange && (0, _utils.calcDateNum)(date) > maxRange) {
        (0, _toast["default"])({
          context: this,
          message: rangePrompt || "\u9009\u62E9\u5929\u6570\u4E0D\u80FD\u8D85\u8FC7 ".concat(maxRange, " \u5929")
        });
        return false;
      }

      return true;
    },
    onConfirm: function onConfirm() {
      var _this3 = this;

      if (this.data.type === "range" && !this.checkRange(this.data.currentDate)) {
        return;
      }

      wx.nextTick(function () {
        // @ts-ignore
        _this3.$emit("confirm", (0, _utils.copyDates)(_this3.data.currentDate));
      });
    }
  }
});