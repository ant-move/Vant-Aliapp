"use strict";

var _component = require("../common/component");

var _shared = require("../picker/shared");

var _utils = require("../common/utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var COLUMNSPLACEHOLDERCODE = "000000";
(0, _component.VantComponent)({
  classes: ["active-class", "toolbar-class", "column-class"],
  props: Object.assign(Object.assign({}, _shared.pickerProps), {
    value: {
      type: String,
      observer: function observer(value) {
        this.code = value;
        this.setValues();
      }
    },
    areaList: {
      type: Object,
      value: {},
      observer: "setValues"
    },
    columnsNum: {
      type: null,
      value: 3,
      observer: function observer(value) {
        this.setData({
          displayColumns: this.data.columns.slice(0, +value)
        });
      }
    },
    columnsPlaceholder: {
      type: Array,
      value: [],
      observer: function observer(val) {
        this.setData({
          typeToColumnsPlaceholder: {
            province: val[0] || "",
            city: val[1] || "",
            county: val[2] || ""
          }
        });
      }
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
    }],
    typeToColumnsPlaceholder: {}
  },
  mounted: function mounted() {
    var _this = this;

    (0, _utils.requestAnimationFrame)(function () {
      _this.setValues();
    });
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
      var index = event.detail.index;
      var value = event.detail.value;
      value = this.parseOutputValues(value);
      this.emit("confirm", {
        value: value,
        index: index
      });
    },
    emit: function emit(type, detail) {
      detail.values = detail.value;
      delete detail.value;
      this.$emit(type, detail);
    },
    // parse output columns data
    parseOutputValues: function parseOutputValues(values) {
      var columnsPlaceholder = this.data.columnsPlaceholder;
      return values.map(function (value, index) {
        // save undefined value
        if (!value) return value;
        value = JSON.parse(JSON.stringify(value));

        if (!value.code || value.name === columnsPlaceholder[index]) {
          value.code = "";
          value.name = "";
        }

        return value;
      });
    },
    onChange: function onChange(event) {
      var _this2 = this;

      var _event$detail = event.detail,
          index = _event$detail.index,
          picker = _event$detail.picker,
          value = _event$detail.value;
      this.code = value[index].code;
      this.setValues().then(function () {
        _this2.$emit("change", {
          picker: picker,
          values: _this2.parseOutputValues(picker.getValues()),
          index: index
        });
      });
    },
    getConfig: function getConfig(type) {
      var areaList = this.data.areaList;
      return areaList && areaList["".concat(type, "_list")] || {};
    },
    getList: function getList(type, code) {
      var typeToColumnsPlaceholder = this.data.typeToColumnsPlaceholder;
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

      if (code != null) {
        // oversea code
        if (code[0] === "9" && type === "city") {
          code = "9";
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      if (typeToColumnsPlaceholder[type] && result.length) {
        // set columns placeholder
        var codeFill = type === "province" ? "" : type === "city" ? COLUMNSPLACEHOLDERCODE.slice(2, 4) : COLUMNSPLACEHOLDERCODE.slice(4, 6);
        result.unshift({
          code: "".concat(code).concat(codeFill),
          name: typeToColumnsPlaceholder[type]
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
      var county = this.getConfig("county");
      var code = this.code;

      if (!code) {
        if (this.data.columnsPlaceholder.length) {
          code = COLUMNSPLACEHOLDERCODE;
        } else if (Object.keys(county)[0]) {
          code = Object.keys(county)[0];
        } else {
          code = "";
        }
      }

      code = code.toString();
      var province = this.getList("province");
      var city = this.getList("city", code.slice(0, 2));
      var picker = this.getPicker();

      if (!picker) {
        return;
      }

      var stack = [];
      var indexes = [];
      var columnsNum = this.data.columnsNum;

      if (columnsNum >= 1) {
        stack.push(picker.setColumnValues(0, province, false));
        indexes.push(this.getIndex("province", code));
      }

      if (columnsNum >= 2) {
        stack.push(picker.setColumnValues(1, city, false));
        indexes.push(this.getIndex("city", code));

        if (city.length && code.slice(2, 4) === "00") {
          var _city = _slicedToArray(city, 1);

          code = _city[0].code;
        }
      }

      if (columnsNum === 3) {
        stack.push(picker.setColumnValues(2, this.getList("county", code.slice(0, 4)), false));
        indexes.push(this.getIndex("county", code));
      }

      return Promise.all(stack)["catch"](function () {}).then(function () {
        return picker.setIndexes(indexes);
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
    reset: function reset(code) {
      this.code = code || "";
      return this.setValues();
    }
  }
});