"use strict";

/**
 * 把支付宝的e转成对等的微信e
 */
function antmoveAction(e) {
  var wxEvent = {
    currentTarget: e.currentTarget,
    target: e.target,
    type: e.type.toLowerCase(),
    changedTouches: e.changedTouches,
    touches: e.touches,
    timeStamp: e.timeStamp
  };
  var eventDetail = e.detail || {};
  var pageX = eventDetail.pageX,
      pageY = eventDetail.pageY;

  if (!wxEvent.changedTouches) {
    wxEvent.changedTouches = [e.detail];
  }

  if (!wxEvent.touches) {
    wxEvent.touches = [e.detail];
  }

  if (typeof pageX !== 'undefined' && typeof pageY !== 'undefined') {
    wxEvent.detail = {
      x: pageX,
      y: pageY
    };
  } else {
    wxEvent.detail = eventDetail;
  }

  var userFnName = "antmove".concat(wxEvent.type.replace(/^\w/, function ($1) {
    return $1.toUpperCase();
  }));
  var userFn = e.currentTarget.dataset[userFnName];

  if (!userFn || !this[userFn]) {
    console.warn("does not have a method \"".concat(userFnName, "\" to handle event \"").concat(wxEvent.type, "\""));
    return;
  }

  delete e.currentTarget.dataset[userFnName];
  this[userFn](wxEvent);
}

module.exports = {
  connectNodes: function connectNodes(node, ast) {
    if (!node.$relationNode.$parent) {
      return false;
    }

    var parentNodeId = node.$relationNode.$parent.$id;
    var parentNodeRoute = node.$relationNode.$parent.$route;
    var refNumbers = node.$self.props.refNumbers && node.$self.props.refNumbers.length || 1;
    var parentArray = ast.$refNodes[parentNodeRoute][parentNodeId];
    var parent = null;

    if (refNumbers > 1) {
      parentArray.forEach(function (_parent) {
        if (_parent.$children.length < refNumbers && !parent) {
          parent = _parent;
          return true;
        }
      });
    } else {
      parent = parentArray[parentArray.length - 1];
    }

    if (parent) {
      node.setParent(parent);
    }
  },
  setIfWatch: setIfWatch,
  antmoveAction: antmoveAction
};

function setIfWatch(res) {
  my.setStorageSync({
    key: 'ifWatch',
    data: res
  });
}