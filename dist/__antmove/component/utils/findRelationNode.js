"use strict";

function findRelationNode(node, p, type) {
  var isArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // parent child ancestor descendant
  var nodes = [];
  var _prcess = {
    parent: function parent(node) {
      if (!node || !node.$parent) return;

      var _p = node.$parent.$self.is || node.$parent.$self.route;

      if (_p === p) {
        return node.$parent;
      }
    },
    child: function child(node) {
      var _child = null;
      node.$children.forEach(function (child) {
        var _p = child.$self.is;

        if (_p === p) {
          _child = child;

          if (!isArray) {
            return _child;
          }

          nodes.push(_child);
        }
      });
      return _child;
    },
    ancestor: function ancestor(node) {
      if (!node) return;
      var _node = null;
      _node = _prcess.parent(node);

      if (!_node) {
        _node = _prcess.ancestor(node.$parent);
      }

      return _node;
    },
    descendant: function descendant(node) {
      var _node = null;
      _node = _prcess.child(node);

      if (!_node) {
        node.$children.forEach(function (c) {
          _node = _prcess.child(c);

          if (!_node) {
            _node = _prcess.descendant(c);
          }
        });
      }

      return _node;
    }
  };

  var ret = _prcess[type](node);

  if (isArray) {
    if (type === 'parent' || type === 'ancestor') return [ret];
    return nodes;
  }

  return ret;
}

module.exports = findRelationNode;