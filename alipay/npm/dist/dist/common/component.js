"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VantComponent = VantComponent;

var _basic = require("../mixins/basic");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
var relationFunctions = {
  ancestor: {
    linked: function linked(parent) {
      // @ts-ignore
      this.parent = parent;
    },
    unlinked: function unlinked() {
      // @ts-ignore
      this.parent = null;
    }
  },
  descendant: {
    linked: function linked(child) {
      // @ts-ignore
      this.children = this.children || []; // @ts-ignore

      this.children.push(child);
    },
    unlinked: function unlinked(child) {
      // @ts-ignore
      this.children = (this.children || []).filter(function (it) {
        return it !== child;
      });
    }
  }
};

function mapKeys(source, target, map) {
  Object.keys(map).forEach(function (key) {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function makeRelation(options, vantOptions, relation) {
  var type = relation.type,
      name = relation.name,
      _linked = relation.linked,
      _unlinked = relation.unlinked,
      _linkChanged = relation.linkChanged;
  var beforeCreate = vantOptions.beforeCreate,
      destroyed = vantOptions.destroyed;

  if (type === "descendant") {
    options.created = function () {
      beforeCreate && beforeCreate.bind(this)();
      this.children = this.children || [];
    };

    options.detached = function () {
      this.children = [];
      destroyed && destroyed.bind(this)();
    };
  }

  options.relations = Object.assign(options.relations || {}, _defineProperty({}, "../".concat(name, "/index"), {
    type: type,
    linked: function linked(node) {
      relationFunctions[type].linked.bind(this)(node);
      _linked && _linked.bind(this)(node);
    },
    linkChanged: function linkChanged(node) {
      _linkChanged && _linkChanged.bind(this)(node);
    },
    unlinked: function unlinked(node) {
      relationFunctions[type].unlinked.bind(this)(node);
      _unlinked && _unlinked.bind(this)(node);
    }
  }));
}

function VantComponent() {
  var vantOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = {};
  var _destroyed = vantOptions.destroyed;

  vantOptions.destroyed = function () {
    this.isDestroyed = true;
    _destroyed && _destroyed.bind(this)();
  };

  mapKeys(vantOptions, options, {
    data: "data",
    props: "properties",
    mixins: "behaviors",
    methods: "methods",
    beforeCreate: "created",
    created: "attached",
    mounted: "ready",
    relations: "relations",
    destroyed: "detached",
    classes: "externalClasses"
  });
  var relation = vantOptions.relation;

  if (relation) {
    makeRelation(options, vantOptions, relation);
  } // add default externalClasses


  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push("custom-class"); // add default behaviors

  options.behaviors = options.behaviors || [];
  options.behaviors.push(_basic.basic); // map field to form-field behavior

  if (vantOptions.field) {
    options.behaviors.push("wx://form-field");
  }

  if (options.properties) {
    Object.keys(options.properties).forEach(function (name) {
      if (Array.isArray(options.properties[name])) {
        // miniprogram do not allow multi type
        options.properties[name] = null;
      }
    });
  } // add default options


  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };
  Component(options);
}