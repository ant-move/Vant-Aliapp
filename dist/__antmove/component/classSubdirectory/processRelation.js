"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node =
/*#__PURE__*/
function () {
  function Node() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Node);

    this.$id = opts.id;
    this.$opts = opts;
    this.$children = [];
    this.$parent = null;

    this.$render = function () {};
  }

  _createClass(Node, [{
    key: "appendChild",
    value: function appendChild(child) {
      this.$children.push(child);
      child.$parent = this;
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      this.$children = this.$children.filter(function (c) {
        return c.$id !== child.$id;
      });
    }
  }]);

  return Node;
}();

module.exports = function link() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cb = arguments.length > 1 ? arguments[1] : undefined;
  var node = new Node({
    id: opts.id
  });

  if (typeof cb === 'function') {
    cb(node);
  }

  if (Array.isArray(opts.children)) {
    opts.children.forEach(function (child) {
      node.appendChild(link(child, cb));
    });
  }

  return node;
};