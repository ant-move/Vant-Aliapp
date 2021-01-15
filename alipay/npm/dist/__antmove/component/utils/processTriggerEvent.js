"use strict";

function createCustomEvent() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var e = {
    target: {
      dataset: {}
    },
    currentTarget: {
      dataset: {},
      // 组件的id
      id: props.id
    }
  };
  Object.keys(props).forEach(function (prop) {
    if (prop.match(/^data-/)) {
      var originProp = prop;
      prop = prop.replace(/[A-Z]/g, function ($) {
        return $.toLowerCase();
      });
      prop = prop.split('-');
      prop.shift();
      prop = prop.join('');
      e.target.dataset[prop] = props[originProp];
      e.currentTarget.dataset[prop] = props[originProp];
    }
  });
  return e;
}

function processTriggerEvent() {
  this.triggerEvent = function (event, data) {
    var eventType = event[0].toLowerCase() + event.substring(1);
    event = "on".concat(event[0].toUpperCase()).concat(event.substring(1));
    var e = createCustomEvent(this.props);
    e.type = eventType;
    e.detail = data;
    event = event.replace(/-\w+/, function (name) {
      name = name[1].toUpperCase() + name.substring(2);
      return name;
    });

    if (typeof this.props[event] === 'function') {
      this.props[event](e);
    }
  };
}

module.exports = processTriggerEvent;