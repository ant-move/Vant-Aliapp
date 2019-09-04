"use strict";

function selectComponent(ctx) {
  this.$ctx = ctx;
  this.$nodes = {};
  this.$cacheNodes = {};
}

selectComponent.prototype = {
  _addComponentNode: function _addComponentNode(className, ctx) {
    className = '.' + className;
    var componentNodes = this.$nodes;

    if (componentNodes[className]) {
      componentNodes[className].push(ctx);
    } else {
      componentNodes[className] = [ctx];
    }

    this.$cacheNodes[ctx.$id] = {
      className: className
    };
  },
  addComponentNodeId: function addComponentNodeId(id, ctx) {
    id = '#' + id;
    var componentNodes = this.$nodes;

    if (componentNodes[id]) {
      componentNodes[id].push(ctx);
    } else {
      componentNodes[id] = [ctx];
    }

    this.$cacheNodes[ctx.$id] = {
      id: id
    };
  },
  addComponentNode: function addComponentNode() {
    var _this = this;

    var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var ctx = arguments.length > 1 ? arguments[1] : undefined;
    var classNameArray = className.split(/\s+/g);
    classNameArray.forEach(function (classNameStr) {
      _this._addComponentNode(classNameStr, ctx);
    });
  },
  selectComponent: function selectComponent(className) {
    var componentNodes = this.$nodes;
    return componentNodes[className] && componentNodes[className][0];
  },
  selectComponents: function selectComponents(className) {
    var componentNodes = this.$nodes;
    return componentNodes[className];
  },
  preProcesscomponents: preProcesscomponents,
  connect: function connect() {
    var ctx = this.$ctx;
    var self = this;

    ctx.selectComponent = function () {
      return self.selectComponent.apply(self, arguments);
    };

    ctx.selectAllComponents = function () {
      return self.selectComponents.apply(self, arguments);
    };
  }
};

function preProcesscomponents(ctx) {
  var _this2 = this;

  var selectorObj = this.$cacheNodes[ctx.$id];
  selectorObj && Object.keys(selectorObj).forEach(function (item) {
    _this2.$nodes[item] = [];
  });

  if (ctx.props.id) {
    this.addComponentNodeId(ctx.props.id, ctx);
  }

  if (ctx.props.className) {
    this.addComponentNode(ctx.props.className, ctx);
  }
}

module.exports = selectComponent;