"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var utils = require('../../api/utils');

var warnLife = utils.warnLife,
    fnAppClass = utils.fnAppClass,
    browserPath = utils.browserPath;

var createNode = require('./relation');

var processRelationHandle = require('./processRelation');

var Relations = require('../../api/relations');

var SelectComponent = require('./selectComponent');

var _id = 0;

var _require = require('../utils'),
    getUrl = _require.getUrl,
    updateData = _require.updateData,
    processMethods = _require.processMethods,
    processRelationPath = _require.processRelationPath,
    _relationNode = _require._relationNode,
    findRelationNode = _require.findRelationNode,
    compatibleLifetime = _require.compatibleLifetime,
    collectObserver = _require.collectObserver,
    collectObservers = _require.collectObservers,
    processTriggerEvent = _require.processTriggerEvent,
    observerHandle = _require.observerHandle,
    handleProps = _require.handleProps,
    handleExternalClasses = _require.handleExternalClasses,
    handleAfterInit = _require.handleAfterInit,
    mergeOptions = _require.mergeOptions;

function getInfo(key, obj) {
  var val = {};
  Object.keys(obj).forEach(function (item) {
    if (key === item) {
      val = obj[item];
    } else if (key.indexOf(item) !== -1) {
      val = obj[item];
    }
  });
  return val;
}

function processRelations(ctx) {
  var relationInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var route = ctx.is;

  if (!my.canIUse('component2')) {
    route = JSON.parse(JSON.stringify(my.getStorageSync({
      key: 'activeComponent'
    }))).data.is;
  }

  route = route.replace(/\/node_modules\/[a-z-]+\/[a-z-]+/, '');
  ctx.is = route;
  ctx.$id = _id++;

  if (route[0] === '/') {
    route = route.substring(1);
  }

  var info = getInfo(route, relationInfo);

  if (info) {
    processRelationHandle(info, function (node) {
      ctx.methods = ctx.methods || {};
      var methods = ctx.methods;

      if (node.$id === 'saveChildRef0') {
        methods[node.$id] = function () {
          var _this = this;

          this.$antmove.relationApp = this.$antmove.relationApp || {
            fns: []
          };
          node.$index = 0;
          node.$route = route;
          createNode.call(this, this, null, node);
          this.$antmove.relationApp.fns.forEach(function (fn) {
            fn.call(_this);
          });
          var _arr = [];
          this.$antmove.relationApp.relationFns.forEach(function (fn) {
            if (!fn.call(_this)) {
              _arr.push(fn);
            }
          });
          this.$antmove.relationApp.relationFns = _arr;

          if (this.onRelationsUpdate) {
            this.onRelationsUpdate();
          }
        };

        return false;
      }

      methods[node.$id] = function (ref) {
        this.$antmove = this.$antmove || {};
        this.$antmove.refFns = this.$antmove.refFns || {};
        this.$antmove.relationApp = this.$antmove.relationApp || {
          fns: [],
          relationFns: []
        };

        if (!this.$antmove.refFns[ref.$id]) {
          this.$antmove.refFns[ref.$id] = true;
          this.$antmove.relationApp.fns.push(function fn() {
            this.selectComponentApp.preProcesscomponents(ref);
            var ctx = this;
            ctx.$antmove = ctx.$antmove || {};

            if (ctx.$antmove[node.$id] === undefined) {
              ctx.$antmove[node.$id] = 0;
            } else {
              ctx.$antmove[node.$id] += 1;
            }

            node.$index = ctx.$antmove[node.$id];
            node.$route = route;
            createNode.call(ctx, ref, null, node);
          });
          this.$antmove.relationApp.relationFns.push(function () {
            return ref.handleRelations && ref.handleRelations();
          });
        }

        if (this.saveChildRef0) {
          this.saveChildRef0();
        }
      };
    });
  } else {
    console.warn('Missing nodes relation of ', route);
  }
}

function handleRelations() {
  var _this2 = this;

  var isFinished = true;

  if (this.props.theRelations) {
    Object.keys(this.props.theRelations).forEach(function (relation) {
      var _p = processRelationPath(_this2, relation);

      var relationInfo = _this2.props.theRelations[relation];
      var nodes = null;

      if (relationInfo.type === 'child' || relationInfo.type === 'descendant') {
        return false;
      }

      nodes = findRelationNode(_this2.$node, _p, relationInfo.type, true);

      if (!nodes || nodes[0] === undefined) {
        // 有一个 relations 节点没绑上就表示还未完成
        isFinished = false;
        return false;
      }

      nodes.forEach(function (n) {
        if (!n) {
          // console.error('wrong relation reference of ', relationInfo);
          // console.error('from: ', this.$node.$self.is, 'to: ', _p);
          return false;
        }

        _relationNode.call(_this2, n, {
          relationInfo: relationInfo,
          _p: _p,
          relation: relation
        });
      });
    });
  }

  return isFinished;
}

function behaviorsAssign(_opts, item, res) {
  var obj = {};

  if (_opts[res]) {
    obj = Object.assign.apply(Object, [_opts[res]].concat(_toConsumableArray(item[res])));
  } else {
    obj = item[res];
  }

  return obj;
}

function processObservers(observersObj, options, param) {
  if (options.observers) {
    collectObservers.call(this, observersObj, options, param);
  }
}

function processInit() {
  getUrl();
  this._currentEvent = {};
  this.setData({
    theId: this.$id
  });
}

function processIntersectionObserver(context) {
  context.createIntersectionObserver = function () {
    var _my;

    return my.createIntersectionObserver && (_my = my).createIntersectionObserver.apply(_my, arguments);
  };
}

function preProcesscomponents() {
  if (this.props.id) {
    this.$node.addComponentNodeId(this.props.id, this);
  }

  if (this.props.className) {
    this.$node.addComponentNode(this.props.className, this);
  }
}
/**
 * 
 * @param {*} behavior 
 * @param {*} _opts 
 * @param {*} mixins 
 */


module.exports = {
  processTransformationComponent: function processTransformationComponent(_opts, options) {
    var fnApp = fnAppClass();
    options.properties = options.properties || {};
    var behaviors = options.behaviors || [];
    var mixins = options.mixins || [];
    delete options.behaviors;
    delete options.mixins;
    var retMixins = {};
    processBehavior(retMixins, behaviors);
    processBehavior(retMixins, mixins);
    mergeOptions(retMixins, options);
    Object.keys(options).forEach(function (key) {
      _opts[key] = options[key];
    });
    _opts.observerObj = {};
    _opts.observersObj = {};
    handleProps(_opts);
    handleExternalClasses(_opts);

    var _life = compatibleLifetime(options);

    if (options.properties) {
      collectObserver(_opts.observerObj, options.properties, options);
    }

    if (_opts.methods) {
      processMethods(_opts);
    }

    processRelations(_opts, Relations);

    var didMount = function didMount() {
      /**
       * for child ref
       * 
       * 当父级组件挂载后再执行父级组件传递下来的属性回调函数
       */
      this.setData({
        isMounted: true
      });
      _life.error && warnLife("There is no error life cycle", "error");
      _life.move && warnLife("There is no moved life cycle", "moved");
      _life.pageLifetimes && warnLife("There is no page life cycle where the component resides,including(show,hide,resize)", "pageLifetimes");
      this.props.genericSelectable && warnLife("generic:selectable is Unsupported", "generic");

      if (typeof this.triggerEvent !== 'function') {
        processTriggerEvent.call(this);
      }
    };

    fnApp.add('onInit', function () {
      processIntersectionObserver(this);
    });
    fnApp.add('deriveDataFromProps', function () {});
    fnApp.add('didMount', didMount);
    fnApp.add('onInit', options.created);
    fnApp.insert('onInit', function () {
      this.getRelationNodes = function () {
        return [];
      };

      this.selectComponentApp = new SelectComponent(this);
      var self = this;

      this.handleRelations = function () {
        handleRelations.call(self);
      };

      this.properties = _objectSpread({}, _opts.properties);
      processInit.call(this, _opts, options, _life, fnApp);
      updateData.call(this);
      this.selectComponentApp.connect();
      observerHandle(_opts.observerObj, [_opts.props, this.data], this, true);
    });
    fnApp.bind('onInit', _opts);
    fnApp.add('didMount', _opts.attached);
    fnApp.add('didMount', _opts.ready);
    fnApp.insert('didMount', function () {
      if (!my.canIUse('component2')) {
        _opts.onInit.call(this);
      }
    });

    var didUpdate = function didUpdate() {
      if (this.props._parent_ref && !this.isInitRelation) {
        if (this.props.onChildRef) {
          this.isInitRelation = true;
          this.props.onChildRef(this);
        }
      }

      for (var _len = arguments.length, param = new Array(_len), _key = 0; _key < _len; _key++) {
        param[_key] = arguments[_key];
      }

      updateData.call(this, param);
      processObservers.call(this, _opts.observersObj, options, param);
      observerHandle(_opts.observerObj, param, this);
    };

    fnApp.add('didUpdate', didUpdate);
    fnApp.add('didUpdate', function () {
      handleAfterInit.call(this);
    });
    fnApp.bind('deriveDataFromProps', _opts);
    fnApp.bind('didUpdate', _opts);
    fnApp.bind('didMount', _opts);
    fnApp.add('didUnmount', options.detached);
    fnApp.add('didUnmount', function () {
      if (this.$node) {
        this.$node.parent.removeChild(this.$node);
        var refId = this.$node.$relationNode.$id;
        this.$antmove[refId]--;
      }
    });
    fnApp.bind("didUnmount", options.didUnmount);
  }
};

function handleData() {
  var otps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
}
/**
 * behavior
 */


function processBehavior() {
  var _opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = arguments.length > 1 ? arguments[1] : undefined;

  if (Array.isArray(opts)) {
    opts.forEach(function (item) {
      if (_typeof(item) === 'object') {
        _process(_opts, item);
      }
    });
  } else {
    if (_typeof(opts) === 'object') {
      _process(_opts, opts);
    }
  }

  function _process() {
    var __opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (opt.behaviors) {
      processBehavior(__opts, opt.behaviors);
      delete opt.behaviors;
    }

    if (opt.mixins) {
      processBehavior(__opts, opt.mixins);
      delete opt.mixins;
    }

    mergeOptions(opt, __opts);
  }
}