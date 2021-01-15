"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var utils = require('../../api/utils');

var warnLife = utils.warnLife,
    fnAppClass = utils.fnAppClass;

var Relations = require('../../api/relations');

var config = require('../../api/config.js');

var _require = require('../../api/my'),
    createSelectorQuery = _require.createSelectorQuery,
    createIntersectionObserver = _require.createIntersectionObserver;

var _require2 = require('../utils'),
    getUrl = _require2.getUrl,
    updateData = _require2.updateData,
    processRelationPath = _require2.processRelationPath,
    _relationNode = _require2._relationNode,
    findRelationNode = _require2.findRelationNode,
    compatibleLifetime = _require2.compatibleLifetime,
    collectObserver = _require2.collectObserver,
    collectObservers = _require2.collectObservers,
    processTriggerEvent = _require2.processTriggerEvent,
    observerHandle = _require2.observerHandle,
    handleProps = _require2.handleProps,
    handleExternalClasses = _require2.handleExternalClasses,
    handleAfterInit = _require2.handleAfterInit,
    mergeOptions = _require2.mergeOptions,
    copy = _require2.copy,
    nextUid = _require2.nextUid;

var SelectComponent = require('./selectComponent');

var processRelationHandle = require('./processRelation');

var createNode = require('./relation');

var _require3 = require('./utils'),
    antmoveAction = _require3.antmoveAction;

function getInfo(key, obj) {
  var val = {};
  Object.keys(obj).forEach(function (item) {
    if (key === item || key.indexOf(item) !== -1) {
      val = obj[item];
    }
  });
  return val;
}

function processRelations(ctx) {
  var relationInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var route = ctx.is;
  route = route.replace(/\/node_modules\/[a-z-]+\/[a-z-]+/, '');

  if (route[0] === '/') {
    route = route.substring(1);
  }

  var info = getInfo(route, relationInfo);

  if (info) {
    processRelationHandle(info, function (node) {
      if (node.$id === 'saveChildRef0') {
        ctx[node.$id] = function () {};

        node.$index = 0;
        node.$route = route;
        createNode.call(ctx, ctx, null, node);
        return false;
      }

      ctx[node.$id] = function (ref) {
        ctx.$antmove = ctx.$antmove || {};

        if (ctx.$antmove[node.$id] === undefined) {
          ctx.$antmove[node.$id] = 0;
        } else {
          ctx.$antmove[node.$id] += 1;
        }

        this.selectComponentApp.preProcesscomponents(ref);
        node.$index = ctx.$antmove[node.$id];
        node.$route = route;
        createNode.call(ctx, ref, null, node);
      };
    });
  } else {
    console.warn('Missing nodes relation of ', route);
  }
}

function handleRelations() {
  var _this = this;

  if (this.props.theRelations) {
    Object.keys(this.props.theRelations).forEach(function (relation) {
      var _p = processRelationPath(_this, relation);

      var relationInfo = _this.props.theRelations[relation];
      var nodes = null;

      if (relationInfo.type === 'child' || relationInfo.type === 'descendant') {
        return false;
      }

      nodes = findRelationNode(_this.$node, _p, relationInfo.type, true);

      if (!nodes || nodes[0] === undefined) {
        return false;
      }

      nodes.forEach(function (n) {
        if (!n) {
          // console.error('wrong relation reference of ', relationInfo);
          // console.error('from: ', this.$node.$self.is, 'to: ', _p);
          return false;
        }

        _relationNode.call(_this, n, {
          relationInfo: relationInfo,
          _p: _p,
          relation: relation
        });
      });
    });
  }
}

function processObservers(observersObj, options, param) {
  if (options.observers) {
    collectObservers.call(this, observersObj, options, param);
  }
}

function processInit() {
  getUrl();
}

function processIntersectionObserver(context) {
  context.createIntersectionObserver = function () {
    return createIntersectionObserver.fn.apply(createIntersectionObserver, arguments);
  };
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

    var _export = options["export"] || '';

    delete options.behaviors;
    delete options.mixins;
    var retMixins = {};
    _opts.observerObj = {};
    _opts.observersObj = {};
    _opts.behaviorsArr = [];
    processBehavior(retMixins, behaviors, _opts.behaviorsArr);
    processBehavior(retMixins, mixins, _opts.behaviorsArr);
    mergeOptions(retMixins, options);
    processBehaviorId(behaviors);
    processBehaviorId(mixins);
    Object.keys(options).forEach(function (key) {
      _opts[key] = options[key];
    });
    handleProps(_opts);
    handleExternalClasses(_opts);

    var _life = compatibleLifetime(options);

    if (options.properties) {
      collectObserver(_opts.observerObj, options.properties, options);
    }

    if (!_opts.methods) {
      _opts.methods = {};
    }

    _opts.methods.antmoveAction = antmoveAction;
    /**
     * 处理组件所在的页面尺寸变化时执行
     */

    if (_opts.pageLifetimes && _opts.pageLifetimes.resize) {
      _opts.methods.antmovePageLifetimes = function (e) {
        return _opts.pageLifetimes.resize(e);
      };
    }

    var didMount = function didMount() {
      var _this2 = this;

      _life.error && warnLife('There is no error life cycle', 'error');
      _life.move && warnLife('There is no moved life cycle', 'moved');
      _life.pageLifetimes && warnLife('There is no page life cycle where the component resides,including(show,hide,resize)', 'pageLifetimes');
      this.props.genericSelectable && warnLife('generic:selectable is Unsupported', 'generic'); // process relations, get relation ast

      var relationAst = createNode.call(this, null, null, null, null, true).mountedHandles;
      relationAst.push(function () {
        handleRelations.call(_this2);
      });
    };

    fnApp.add('onInit', function () {
      this.onPageReady = function (p) {
        _opts.onPageReady && _opts.onPageReady.call(this, p);
      };
    });
    fnApp.add('deriveDataFromProps', function () {});
    fnApp.add('didMount', didMount);

    if (_opts.lifetimes && _opts.lifetimes.created) {
      fnApp.add('onInit', _opts.lifetimes.created);
    } else {
      fnApp.add('onInit', _opts.created);
    }

    fnApp.insert('onInit', function () {
      this.__wxExparserNodeId__ = nextUid();
      processIntersectionObserver(this);

      this.createSelectorQuery = function () {
        if (config.env !== 'production') {
          console.warn('支付宝createSelectorQuery不支持限定选择器的选择范围，如使用，请保证对应选择器使用的唯一性');
        }

        return createSelectorQuery.fn();
      };

      for (var method in this) {
        if (typeof this[method] === 'function') {
          this[method] = this[method].bind(this);
        }
      }

      this.getRelationNodes = function () {
        return [];
      };

      processComponentExport(_export, behaviors, this);
      this.selectComponentApp = new SelectComponent(this);
      this.properties = _objectSpread({}, _opts.properties);
      processInit.call(this, _opts, options, _life, fnApp);
      testBehaviors(behaviors);
      updateData.call(this);
      processRelations(this, Relations);
      this.selectComponentApp.connect();
      this.selectOwnerComponent = processSelectOwnerComponent.bind(this);
      this.getPageId = processGetPageId.bind(this);
      addAntmoveData.call(this);

      if (typeof this.triggerEvent !== 'function') {
        processTriggerEvent.call(this);
      }

      processObservers.call(this, _opts.observersObj, options, _opts);
      observerHandle(_opts.observerObj, _opts, this, true);
    });
    fnApp.bind('onInit', _opts);

    if (_opts.lifetimes && _opts.lifetimes.attached) {
      fnApp.add('didMount', _opts.lifetimes.attached);
    } else {
      fnApp.add('didMount', _opts.attached);
    }

    if (_opts.pageLifetimes && _opts.pageLifetimes.show) {
      fnApp.add('didMount', _opts.pageLifetimes.show);
    }

    fnApp.add('didMount', _opts.ready || _opts.lifetimes && _opts.lifetimes.ready);

    var didUpdate = function didUpdate() {
      for (var _len = arguments.length, param = new Array(_len), _key = 0; _key < _len; _key++) {
        param[_key] = arguments[_key];
      }

      updateData.call(this, param);
      processObservers.call(this, _opts.observersObj, options, this.$antmove._data);
      observerHandle(_opts.observerObj, this.$antmove._data, this);
      addAntmoveData.call(this);
    };

    fnApp.add('didUpdate', didUpdate);
    fnApp.add('didUpdate', function () {
      handleAfterInit.call(this);
    });
    fnApp.bind('deriveDataFromProps', _opts);
    fnApp.bind('didUpdate', _opts);
    fnApp.bind('didMount', _opts);

    if (_opts.lifetimes && _opts.lifetimes.detached) {
      fnApp.add('didUnmount', _opts.lifetimes.detached);
    } else {
      fnApp.add('didUnmount', options.detached);
    }

    fnApp.add('didUnmount', function () {
      // todo: 暂时这样处理使其不报错
      if (this.$node && this.$node.$parent) {
        this.$node.$parent.removeChild(this.$node);
        var refId = this.$node.$relationNode.$id;
        this.$antmove[refId]--;
      }
    });
    fnApp.bind('didUnmount', _opts);
  }
};

function addAntmoveData() {
  var _data = [{}, {}];
  var ctx = this;
  var _props = {};

  for (var i in ctx.properties) {
    if (ctx.properties.hasOwnProperty(i)) {
      _props[i] = ctx.data[i];
    }
  }

  _data[0] = copy(_props);
  _data[1] = copy(ctx.data);
  this.$antmove = this.$antmove || {};
  this.$antmove._data = _data;
}
/**
 * selectOwnerComponent
 */


function processSelectOwnerComponent() {
  var node = this.$node;

  if (node && node.$parent && node.$parent.$self) {
    return node.$parent.$self;
  }

  return {};
}
/**
 * getPageId
 */


function processGetPageId() {
  if (this.$page) {
    return "pageId:".concat(this.$page.$id);
  }

  return 'pageId: undefined';
}
/**
 * behavior
 */


function processBehavior() {
  var _opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var opts = arguments.length > 1 ? arguments[1] : undefined;
  var $behaviors = arguments.length > 2 ? arguments[2] : undefined;
  var self = this;

  if (Array.isArray(opts)) {
    opts.forEach(function (item) {
      if (_typeof(item) === 'object' && ($behaviors.indexOf(item.$id) === -1 || item.$id === undefined)) {
        $behaviors.push(item.$id);

        _process.call(self, _opts, item);
      }
    });
  } else if (_typeof(opts) === 'object' && $behaviors.indexOf(opts.$id) === -1) {
    $behaviors.push(opts.$id);

    _process.call(self, _opts, opts);
  }

  function _process() {
    var __opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (opt.behaviors) {
      processBehavior.call(self, __opts, opt.behaviors, $behaviors);
      delete opt.behaviors;
    }

    if (opt.mixins) {
      processBehavior(__opts, opt.mixins, $behaviors);
      delete opt.mixins;
    }

    mergeOptions(opt, __opts);
  }
}

function processBehaviorId(behavior) {
  if (Array.isArray(behavior)) {
    behavior.forEach(function (item) {
      if (_typeof(item) === 'object' && item.$id) {
        delete item.$id;
      }
    });
  } else if (_typeof(behavior) === 'object' && behavior.$id) {
    delete behavior.$id;
  }
}

function processComponentExport(_export, behaviors, self) {
  if (typeof _export !== 'function') {
    return;
  }

  if (Array.isArray(behaviors)) {
    behaviors.forEach(function (bhv) {
      if (bhv === 'wx://component-export') {
        self._this = _export();
      }
    });
  } else if (behaviors === 'wx://component-export') {
    self._this = _export();
  }
}

function testBehaviors(behaviors) {
  if (Array.isArray(behaviors)) {
    behaviors.forEach(function (bhv) {
      if (bhv === 'wx://form-field') {
        warnLife('Wx://form-field in built-in behavior is not supported', 'behavior/form-field');
      }
    });
  } else if (behaviors === 'wx://form-field') {
    warnLife('Wx://form-field in built-in behavior is not supported', 'behavior/form-field');
  }
}