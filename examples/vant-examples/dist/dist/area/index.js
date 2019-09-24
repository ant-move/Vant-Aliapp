"use strict";

var _component = require("../common/component");

var _shared = require("../picker/shared");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(0, _component.VantComponent)({
  classes: ["active-class", "toolbar-class", "column-class"],
  props: Object.assign({}, _shared.pickerProps, {
    value: String,
    areaList: {
      type: Object,
      value: {}
    },
    columnsNum: {
      type: [String, Number],
      value: 3
    }
  }),
  data: {
    columns: [{
      values: []
    }, {
      values: []
    }, {
      values: []
    }],
    displayColumns: [{
      values: []
    }, {
      values: []
    }, {
      values: []
    }]
  },
  watch: {
    value: function value(_value) {
      this.code = _value;
      this.setValues();
    },
    areaList: "setValues",
    columnsNum: function columnsNum(value) {
      this.set({
        displayColumns: this.data.columns.slice(0, +value)
      });
    }
  },
  mounted: function mounted() {
    this.setValues();
  },
  methods: {
    getPicker: function getPicker() {
      if (this.picker == null) {
        this.picker = this.selectComponent(".van-area__picker");
      }

      return this.picker;
    },
    onCancel: function onCancel(event) {
      this.emit("cancel", event.detail);
    },
    onConfirm: function onConfirm(event) {
      this.emit("confirm", event.detail);
    },
    emit: function emit(type, detail) {
      detail.values = detail.value;
      delete detail.value;
      this.$emit(type, detail);
    },
    onChange: function onChange(event) {
      var _this = this;

      var _event$detail = event.detail,
          index = _event$detail.index,
          picker = _event$detail.picker,
          value = _event$detail.value;
      this.code = value[index].code;
      this.setValues().then(function () {
        _this.$emit("change", {
          picker: picker,
          values: picker.getValues(),
          index: index
        });
      });
    },
    getConfig: function getConfig(type) {
      var areaList = this.data.areaList;
      return areaList && areaList["".concat(type, "_list")] || {};
    },
    getList: function getList(type, code) {
      var result = [];

      if (type !== "province" && !code) {
        return result;
      }

      var list = this.getConfig(type);
      result = Object.keys(list).map(function (code) {
        return {
          code: code,
          name: list[code]
        };
      });

      if (code) {
        // oversea code
        if (code[0] === "9" && type === "city") {
          code = "9";
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      return result;
    },
    getIndex: function getIndex(type, code) {
      var compareNum = type === "province" ? 2 : type === "city" ? 4 : 6;
      var list = this.getList(type, code.slice(0, compareNum - 2)); // oversea code

      if (code[0] === "9" && type === "province") {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },
    setValues: function setValues() {
      var _this2 = this;

      var county = this.getConfig("county");
      var code = this.code || Object.keys(county)[0] || "";
      var province = this.getList("province");
      code = String(code);
      var city = this.getList("city", code.slice(0, 2));
      var picker = this.getPicker();

      if (!picker) {
        return;
      }

      var stack = [];
      stack.push(picker.setColumnValues(0, province, false));
      stack.push(picker.setColumnValues(1, city, false));

      if (city.length && code.slice(2, 4) === "00") {
        var _city = _slicedToArray(city, 1);

        code = _city[0].code;
      }

      stack.push(picker.setColumnValues(2, this.getList("county", code.slice(0, 4)), false));
      return Promise.all(stack)["catch"](function () {}).then(function () {
        return picker.setIndexes([_this2.getIndex("province", code), _this2.getIndex("city", code), _this2.getIndex("county", code)]);
      })["catch"](function () {});
    },
    getValues: function getValues() {
      var picker = this.getPicker();
      return picker ? picker.getValues().filter(function (value) {
        return !!value;
      }) : [];
    },
    getDetail: function getDetail() {
      var values = this.getValues();
      var area = {
        code: "",
        country: "",
        province: "",
        city: "",
        county: ""
      };

      if (!values.length) {
        return area;
      }

      var names = values.map(function (item) {
        return item.name;
      });
      area.code = values[values.length - 1].code;

      if (area.code[0] === "9") {
        area.country = names[1] || "";
        area.province = names[2] || "";
      } else {
        area.province = names[0] || "";
        area.city = names[1] || "";
        area.county = names[2] || "";
      }

      return area;
    },
    reset: function reset() {
      this.code = "";
      return this.setValues();
    }
  }
});