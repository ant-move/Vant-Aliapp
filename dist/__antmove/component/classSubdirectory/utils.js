"use strict";

module.exports = {
  connectNodes: function connectNodes(node, ast) {
    if (!node.$relationNode.$parent) return false;
    var parentNodeId = node.$relationNode.$parent.$id;
    var parentNodeRoute = node.$relationNode.$parent.$route;
    var index = node.$relationNode.$parent.$index;
    var refNumbers = node.$self.props.refNumbers && node.$self.props.refNumbers.length || 1;
    var parentArray = ast.$refNodes[parentNodeRoute][parentNodeId];
    var parent = null;

    if (refNumbers > 1) {
      parentArray.forEach(function (_parent) {
        if (_parent.$children.length !== refNumbers && !parent) {
          parent = _parent;
          return true;
        }
      });
    } else {
      parent = parentArray[0];
    }

    if (parent) {
      node.setParent(parent);
    }
  },
  setIfWatch: setIfWatch
};

function setIfWatch(res) {
  my.setStorageSync({
    key: 'ifWatch',
    data: res
  });
}