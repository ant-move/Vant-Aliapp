"use strict";

var _component = require("../common/component");

var _shared = require("./shared");

(0, _component.VantComponent)({
  classes: ["active-class", "toolbar-class", "column-class"],
  props: Object.assign({}, _shared.pickerProps, {
    valueKey: {
      type: String,
      value: "text"
    },
    defaultIndex: {
      type: Number,
      value: 0
    },
    columns: {
      type: Array,
      value: [],
      observer: function observer() {
        var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        this.setChildren(columns);
      }
    }
  }),
  beforeCreate: function beforeCreate() {
    this.children = [];
  },
  methods: {
    noop: function noop() {},
    setChildren: function setChildren(columns) {
      this.simple = columns.length && !columns[0].values;
      this.children = this.selectAllComponents(".van-picker__column");

      if (Array.isArray(this.children) && this.children.length) {
        this.setColumns()["catch"](function () {});
      }
    },
    setColumns: function setColumns() {
      var data = this.data;
      var that = this;
      var columns = this.simple ? [{
        values: data.columns
      }] : data.columns;
      var stack = columns.map(function (column, index) {
        that.setColumnValues(index, column.values);
      });
      return Promise.all(stack);
    },
    emit: function emit(event) {
      var type = event.currentTarget.dataset.type;

      if (this.simple) {
        this.$emit(type, {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0)
        });
      } else {
        this.$emit(type, {
          value: this.getValues(),
          index: this.getIndexes()
        });
      }
    },
    onChange: function onChange(event) {
      if (this.simple) {
        this.$emit("change", {
          picker: this,
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0)
        });
      } else {
        this.$emit("change", {
          picker: this,
          value: this.getValues(),
          index: event.currentTarget.dataset.index
        });
      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      var children = this.children && this.children[index];
      return children;
    },
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);

      if (column == null) {
        return Promise.reject(new Error("setColumnValue: 对应列不存在"));
      }

      return column.setValue(value);
    },
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      var data = (this.getColumn(columnIndex) || {}).data;
      return data && data.currentIndex;
    },
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);

      if (column == null) {
        return Promise.reject(new Error("setColumnIndex: 对应列不存在"));
      }

      return column.setIndex(optionIndex);
    },
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).data.options;
    },
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {
      var needReset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (this.children && this.children.length <= 0) {
        this.setChildren(this.data.columns);
      }

      var column = this.children[index];

      if (column == null) {
        return Promise.reject(new Error("setColumnValues: 对应列不存在"));
      }

      var isSame = JSON.stringify(column.data.options) === JSON.stringify(options);

      if (isSame) {
        return Promise.resolve();
      }

      return column.set({
        options: options
      }).then(function () {
        if (needReset) {
          column.setIndex(0);
        }
      });
    },
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {
        return child.getValue();
      });
    },
    // set values of all columns
    setValues: function setValues(values) {
      var _this = this;

      var stack = values.map(function (value, index) {
        return _this.setColumnValue(index, value);
      });
      return Promise.all(stack);
    },
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {
        return child.data.currentIndex;
      });
    },
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {
      var _this2 = this;

      var stack = indexes.map(function (optionIndex, columnIndex) {
        return _this2.setColumnIndex(columnIndex, optionIndex);
      });
      return Promise.all(stack);
    }
  }
});