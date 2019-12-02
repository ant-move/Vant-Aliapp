"use strict";

function selectComponent(ctx) {
  this.$ctx = ctx;
  this.$nodes = {};
  this.$cacheComponents = {};
  this.$activeComponents = {};
}

selectComponent.prototype = {
  _addComponentNode: function _addComponentNode(className, ctx) {
    className = '.' + className;
    var componentNodes = this.$nodes;

    if (componentNodes[className]) {
      if (componentNodes[className].every(function (item) {
        return item.$id != ctx.$id;
      })) {
        componentNodes[className].push(ctx);
      }
    } else {
      componentNodes[className] = [ctx];
    }

    if (this.$cacheComponents[className]) {
      this.$cacheComponents[className](componentNodes[className]);
    }
  },
  addComponentNodeId: function addComponentNodeId(id, ctx) {
    id = '#' + id;
    var componentNodes = this.$nodes;

    if (componentNodes[id]) {
      if (componentNodes[id].every(function (item) {
        return item.$id != ctx.$id;
      })) {
        componentNodes[id].push(ctx);
      }
    } else {
      componentNodes[id] = [ctx];
    }
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
  remove: function remove(ctx) {
    var components = this.$activeComponents;
    delete components[ctx.$id];
  },
  selectComponent: function selectComponent(className) {
    return this._sortComponents(className)[0];
  },
  selectComponents: function selectComponents(className) {
    return this._sortComponents(className);
  },
  _sortComponents: function _sortComponents(className) {
    var componentNodes = this.$nodes[className] || [];
    return componentNodes.sort(function (pre, next) {
      return Number(pre.$id) > Number(next.$id);
    });
  },
  preProcesscomponents: preProcesscomponents,
  connect: function connect() {
    var ctx = this.$ctx;
    var self = this;

    ctx.selectComponent = function () {
      return self.selectComponent.apply(self, arguments);
    };

    ctx.selectAllComponents = function () {
      return self.selectComponents.apply(self, arguments) || [];
    };

    ctx.selectorWatch = function (selector, cb) {
      self.$cacheComponents[selector] = cb;
    };
  }
};

function preProcesscomponents(ctx) {
  this.$activeComponents[ctx.$id] = true;

  if (ctx.props.id) {
    this.addComponentNodeId(ctx.props.id, ctx);
  }

  if (ctx.props.className) {
    this.addComponentNode(ctx.props.className, ctx);
  }
}

module.exports = selectComponent;