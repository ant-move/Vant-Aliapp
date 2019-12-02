"use strict";

function handleAfterInit() {
  var _this = this;

  var classStr = '';

  this.data.__classNames.forEach(function (key) {
    classStr += _this.props[key] || '';
  });

  this.setData({
    _classes: classStr
  });
}

module.exports = handleAfterInit;