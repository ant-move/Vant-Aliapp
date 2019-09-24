"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  classes: ["icon-class"],
  props: {
    childName: String,
    value: Number,
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: {
      type: Number,
      value: 20
    },
    icon: {
      type: String,
      value: "star"
    },
    voidIcon: {
      type: String,
      value: "star-o"
    },
    color: {
      type: String,
      value: "#ffd21e"
    },
    voidColor: {
      type: String,
      value: "#c7c7c7"
    },
    disabledColor: {
      type: String,
      value: "#bdbdbd"
    },
    count: {
      type: Number,
      value: 5
    }
  },
  data: {
    innerValue: 0
  },
  watch: {
    value: function value(_value) {
      if (_value !== this.data.innerValue) {
        this.set({
          innerValue: _value
        });
      }
    }
  },
  methods: {
    onSelect: function onSelect(event) {
      var data = this.data;
      var score = event.currentTarget.dataset.score;

      if (!data.disabled && !data.readonly) {
        this.set({
          innerValue: score + 1
        });
        this.$emit("input", score + 1);
        this.$emit("change", score + 1);
      }
    },
    onTouchMove: function onTouchMove(event) {
      var _this = this;

      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY;
      var childName = "";

      if (this.props) {
        childName = "." + this.props.childName;
      } else {
        childName = "." + this.properties.childName;
      }

      var nodes = this.selectAllComponents(childName);
      this.getRect(childName, true).then(function (list) {
        if (nodes[0] && nodes[0]["props"]) {
          list.map(function (item, index) {
            item["dataset"] = {};
            item["dataset"]["score"] = nodes[index].props["data-score"];
          });
        }

        var target = list.sort(function (item) {
          return item.right - item.left;
        }).find(function (item) {
          return clientX >= item.left && clientX <= item.right && clientY >= item.top && clientY <= item.bottom;
        });

        if (target != null) {
          _this.onSelect(Object.assign({}, event, {
            currentTarget: target
          }));
        }
      });
    }
  }
});