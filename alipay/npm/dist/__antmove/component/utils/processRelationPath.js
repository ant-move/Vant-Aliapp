"use strict";

var utils = require('../../api/utils');

var browserPath = utils.browserPath;
var posix = browserPath();

function processRelationPath(self, relation) {
  var from = self.is;
  var to = relation;

  if (to[0] === '.') {
    to = "../".concat(to);
  }

  var _p = posix.join(from, to);

  return _p;
}

module.exports = processRelationPath;