"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VantComponent = VantComponent;

var _basic = require("../mixins/basic");

var _index = require("../mixins/observer/index");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _Component = require("../../__antmove/component/componentClass.js")("Component");

function mapKeys(source, target, map) {
  Object.keys(map).forEach(function (key) {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function VantComponent() {
  var vantOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = {};
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
    classes: "externalClasses",
    didUpdate: "didUpdate"
  });
  var relation = vantOptions.relation;

  if (relation) {
    options.relations = Object.assign(options.relations || {}, _defineProperty({}, "../".concat(relation.name, "/index"), relation));
  } // add default externalClasses


  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push("custom-class"); // add default behaviors

  options.behaviors = options.behaviors || [];
  options.behaviors.push(_basic.basic); // map field to form-field behavior

  if (vantOptions.field) {
    options.behaviors.push("wx://form-field");
  } // add default options


  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };
  (0, _index.observe)(vantOptions, options);

  _Component(options);
}