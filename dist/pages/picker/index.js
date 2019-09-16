"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    column1: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    column2: [{
      text: "杭州",
      disabled: true
    }, {
      text: "宁波"
    }, {
      text: "温州"
    }],
    column3: {
      浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      福建: ["福州", "厦门", "莆田", "三明", "泉州"]
    },
    column4: [{
      values: ["浙江", "福建"],
      className: "column1"
    }, {
      values: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      className: "column2",
      defaultIndex: 2
    }]
  },
  onChange1: function onChange1(event) {
    console.log(event);
    var _event$detail = event.detail,
        value = _event$detail.value,
        index = _event$detail.index;
    (0, _toast["default"])("Value: ".concat(value, ", Index\uFF1A").concat(index));
  },
  onConfirm: function onConfirm(event) {
    var _event$detail2 = event.detail,
        value = _event$detail2.value,
        index = _event$detail2.index;
    (0, _toast["default"])("Value: ".concat(value, ", Index\uFF1A").concat(index));
  },
  onCancel: function onCancel() {
    (0, _toast["default"])("取消");
  },
  onChange2: function onChange2(event) {
    var _event$detail3 = event.detail,
        picker = _event$detail3.picker,
        value = _event$detail3.value;
    picker.setColumnValues(1, this.data.column3[value[0]]);
    getApp().picker = picker;
  }
});