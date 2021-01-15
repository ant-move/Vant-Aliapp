"use strict";

function handleAfterInit() {
  var _this = this;

  var classStr = '';

  this.data.__classNames.forEach(function (key) {
    classStr += _this.props[key] || '';
  });

  if (this.data._classes !== classStr) {
    this.setData({
      _classes: classStr
    });
  }
}

module.exports = handleAfterInit;