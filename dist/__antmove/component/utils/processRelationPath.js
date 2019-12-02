"use strict";

var utils = require('../../api/utils');

var browserPath = utils.browserPath;
var posix = browserPath();

function processRelationPath(self, relation) {
  var from = self.is,
      to = relation;

  if (to[0] === '.') {
    to = '../' + to;
  }

  var _p = posix.join(from, to);

  return _p;
}

module.exports = processRelationPath;