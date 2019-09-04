"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var id = 0;

var _require = require('./utils'),
    connectNodes = _require.connectNodes;

var RelationAst = _defineProperty({
  $refNodes: {},
  $nodes: {},
  $page: null,
  current: null,
  createArray: [],
  destoryArray: [],
  mountedHandles: [],
  componentNodes: {}
}, "$refNodes", {});

function createNode(ctx) {
  this.$self = ctx;
  ctx.$node = this;
  this.$id = id++;
  this.$children = [];
}

createNode.prototype = {
  getRootNode: function getRootNode() {
    return RelationAst;
  },
  setParent: function setParent(parent) {
    this.$parent = parent;
    parent.appendChild(this);
  },
  appendChildren: function appendChildren() {
    var _this = this;

    this.$children.forEach(function (child) {
      _this.appendChild(child);
    });
  },
  destory: function destory() {
    var index = this.$relationNode.$index;
    this.$parent.$children.splice(index, 1);
  },
  appendChild: function appendChild(child) {
    this.$children.push(child);
    child.$parent = this;
  },
  removeChld: function removeChld(child) {
    this.$children = this.$children.filter(function (el) {
      return el.$id !== child.$id;
    });
  }
};

function initRootNode() {
  /**
  * 页面节点信息初始化
  */
  RelationAst = {
    $nodes: {},
    $page: null,
    current: null,
    createArray: [],
    destoryArray: [],
    mountedHandles: [],
    componentNodes: {},
    $refNodes: {}
  };
  return RelationAst;
}

function getRootNode() {
  return RelationAst;
}

module.exports = function (node) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var relationNode = arguments.length > 2 ? arguments[2] : undefined;
  var bool = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var _bool = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (_bool) {
    return getRootNode();
  }

  if (bool) {
    return initRootNode();
  }

  var wrapNode = new createNode(node);
  var route = relationNode.$route;
  RelationAst.$page = wrapNode;
  /**
     * component
     */

  wrapNode.$relationNode = relationNode;
  RelationAst.$nodes[node.$id] = wrapNode;
  RelationAst.$refNodes[route] = RelationAst.$refNodes[route] || {};
  var componentNodes = RelationAst.$refNodes[route];
  RelationAst.$refNodes[route][relationNode.$id] = RelationAst.$refNodes[route][relationNode.$id] || [];
  componentNodes[relationNode.$id].push(wrapNode);

  if (RelationAst.isPageReady) {
    setTimeout(function () {
      connectNodes(wrapNode, RelationAst);
      RelationAst.mountedHandles.forEach(function (fn, i) {
        if (wrapNode.$parent) {
          fn();
        } else {
          setTimeout(function () {
            fn();
          }, 0);
        }
      });
      RelationAst.mountedHandles = [];
    }, 0);
  }

  cb && cb(RelationAst);
  return RelationAst;
};