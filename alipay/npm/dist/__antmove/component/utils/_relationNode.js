"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _relationNode(node, info) {
  var relationInfo = info.relationInfo,
      relation = info.relation,
      _p = info._p; // 触发父级组件的 relations

  var type = relationInfo.type;
  var parentType = '';

  if (type === 'parent') {
    parentType = 'child';
  } else if (type === 'ancestor') {
    parentType = 'descendant';
  }

  var parentCtx = node.$self;
  var childCtx = this;

  if (_typeof(parentCtx.props.theRelations) === 'object') {
    Object.keys(parentCtx.props.theRelations).forEach(function (_relation) {
      var _relationInfo = parentCtx.props.theRelations[_relation];

      if (_relationInfo.type === parentType) {
        _relationNode.call(parentCtx, childCtx.$node, {
          relationInfo: _relationInfo,
          relation: _relation,
          _p: processRelationPath(parentCtx, _relation)
        });

        return true;
      }
    });
  }

  node = node.$self;
  this._storeRelationNodes = this._storeRelationNodes || {};

  if (this._storeRelationNodes[_p]) {
    this._storeRelationNodes[_p].push(node);
  } else {
    this._storeRelationNodes[_p] = [node];
  }

  if (this._storeRelationNodes[relation]) {
    this._storeRelationNodes[relation].push(node);
  } else {
    this._storeRelationNodes[relation] = [node];
  }

  var ctx = this || {};

  this.getRelationNodes = function (__p) {
    this._storeRelationNodes = this._storeRelationNodes || {};
    return this._storeRelationNodes[__p] || [];
  };

  if (typeof relationInfo.linked === 'function') {
    relationInfo.linked.call(ctx, node);
  }

  if (typeof relationInfo.linkChanged === 'function') {
    var self = this;
    ctx._lifes = ctx._lifes || {};
    ctx._lifes.didUpdate = ctx._lifes.didUpdate || [];

    ctx._lifes.didUpdate.push(function () {
      relationInfo.linkChanged.call(self, node);
    });
  }

  if (typeof relationInfo.unlinked === 'function') {
    var _self = this;

    ctx._lifes = ctx._lifes || {};
    ctx._lifes.didUnmount = ctx._lifes.didUnmount || [];

    ctx._lifes.didUnmount.push(function () {
      relationInfo.unlinked.call(_self, node);
    });
  }
}

module.exports = _relationNode;