"use strict";

function findRelationNode(node, p, type) {
  var isArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // parent child ancestor descendant
  var nodes = [];
  var _prcess = {
    parent: function parent(_node) {
      if (!_node || !_node.$parent) {
        return;
      }

      var _p = _node.$parent.$self.is || _node.$parent.$self.route;

      if (_p === p) {
        return _node.$parent;
      }
    },
    child: function child(_node) {
      var _child = null;

      _node.$children.forEach(function (child) {
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
    ancestor: function ancestor(__node) {
      if (!__node) {
        return;
      }

      var _node = null;
      _node = _prcess.parent(__node);

      if (!_node) {
        _node = _prcess.ancestor(__node.$parent);
      }

      return _node;
    },
    descendant: function descendant(__node) {
      var _node = null;
      _node = _prcess.child(__node);

      if (!_node) {
        __node.$children.forEach(function (c) {
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
    if (type === 'parent' || type === 'ancestor') {
      return [ret];
    }

    return nodes;
  }

  return ret;
}

module.exports = findRelationNode;