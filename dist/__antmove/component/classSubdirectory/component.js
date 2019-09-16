"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = require('../../api/utils');

var warnLife = utils.warnLife,
    fnAppClass = utils.fnAppClass,
    browserPath = utils.browserPath;

var createNode = require('./relation');

var processRelationHandle = require('./processRelation');

var posix = browserPath();

var Relations = require('../../api/relations');

var SelectComponent = require('./selectComponent');

function processRelations(ctx) {
  var relationInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var route = ctx.is;
  route = route.replace(/\/node_modules\/[a-z-]+\/[a-z-]+/, '');
  var info = relationInfo[route] || relationInfo[route.substring(1)];

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

function getUrl() {
  var pages = getCurrentPages();
  var url = pages[pages.length - 1].route;

  var _arr = url.split('/');

  var _name = _arr[_arr.length - 1];
  my.setStorageSync({
    key: '_pageMsg',
    data: {
      pageName: _name,
      pagePath: url
    }
  });
  return url;
}

function updateData(param) {
  var _this = this;

  var ctx = this;

  if (_typeof(ctx.properties) === 'object') {
    ctx.properties.name = ctx.properties.name || '';
    ctx.properties.value = ctx.properties.value || null;
    Object.keys(ctx.properties).forEach(function (item) {
      // didupdate
      if (param && param[0][item] === _this.props[item]) return false;

      if (ctx.props[item] !== undefined && typeof ctx.props[item] !== 'function' && item[0] !== '$' && ctx.data[item] !== ctx.props[item]) {
        ctx.setData(_defineProperty({}, item, ctx.props[item]));
      }
    });
  }
}

function processMethods() {
  var _opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var methods = {};
  Object.keys(_opts.methods || {}).forEach(function (method) {
    var fn = _opts.methods[method];

    methods[method] = function () {
      for (var _len = arguments.length, p = new Array(_len), _key = 0; _key < _len; _key++) {
        p[_key] = arguments[_key];
      }

      if (p[0] && _typeof(p[0]) === 'object' && p[0].timeStamp && p[0].target) {
        this._currentEvent = p[0];
      }

      return fn.apply(this, p);
    };
  });
  _opts.methods = methods;
  return _opts;
}

function processRelationPath(self, relation) {
  var from = self.is,
      to = relation;

  if (to[0] === '.') {
    to = '../' + to;
  }

  var _p = posix.join(from, to);

  return _p;
}

function handleRelations() {
  var _this2 = this;

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
} // process node relation callback


function _relationNode(node, info) {
  var relationInfo = info.relationInfo,
      relation = info.relation,
      _p = info._p; // 触发父级组件的 relations

  var type = relationInfo.type;
  var parentType = '';

  if (type === 'parent') {
    parentType = 'child';
  } else if (type === 'ancestor') {
    parentType = 'descendant';
  }

  var parentCtx = node.$self;
  var childCtx = this;

  if (_typeof(parentCtx.props.theRelations) === 'object') {
    Object.keys(parentCtx.props.theRelations).forEach(function (relation) {
      var relationInfo = parentCtx.props.theRelations[relation];

      if (relationInfo.type === parentType) {
        _relationNode.call(parentCtx, childCtx.$node, {
          relationInfo: relationInfo,
          relation: relation,
          _p: processRelationPath(parentCtx, relation)
        });

        return true;
      }
    });
  }

  node = node.$self;
  this._storeRelationNodes = this._storeRelationNodes || {};

  if (this._storeRelationNodes[_p]) {
    this._storeRelationNodes[_p].push(node);
  } else {
    this._storeRelationNodes[_p] = [node];
  }

  if (this._storeRelationNodes[relation]) {
    this._storeRelationNodes[relation].push(node);
  } else {
    this._storeRelationNodes[relation] = [node];
  }

  var ctx = this || {};

  this.getRelationNodes = function (_p) {
    this._storeRelationNodes = this._storeRelationNodes || {};
    return this._storeRelationNodes[_p] || [];
  };

  if (typeof relationInfo.linked === 'function') {
    relationInfo.linked.call(ctx, node);
  }

  if (typeof relationInfo.linkChanged === 'function') {
    var self = this;
    ctx._lifes = ctx._lifes || {};
    ctx._lifes.didUpdate = ctx._lifes.didUpdate || [];

    ctx._lifes.didUpdate.push(function () {
      relationInfo.linkChanged.call(self, node);
    });
  }

  if (typeof relationInfo.unlinked === 'function') {
    var _self = this;

    ctx._lifes = ctx._lifes || {};
    ctx._lifes.didUnmount = ctx._lifes.didUnmount || [];

    ctx._lifes.didUnmount.push(function () {
      relationInfo.unlinked.call(_self, node);
    });
  }
}

function findRelationNode(node, p, type) {
  var isArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  // parent child ancestor descendant
  var nodes = [];
  var _prcess = {
    parent: function parent(node) {
      if (!node || !node.$parent) return;

      var _p = node.$parent.$self.is || node.$parent.$self.route;

      if (_p === p) {
        return node.$parent;
      }
    },
    child: function child(node) {
      var _child = null;
      node.$children.forEach(function (child) {
        var _p = child.$self.is;

        if (_p === p) {
          _child = child;

          if (!isArray) {
            return _child;
          }

          nodes.push(_child);
        }
      });
      return _child;
    },
    ancestor: function ancestor(node) {
      if (!node) return;
      var _node = null;
      _node = _prcess.parent(node);

      if (!_node) {
        _node = _prcess.ancestor(node.$parent);
      }

      return _node;
    },
    descendant: function descendant(node) {
      var _node = null;
      _node = _prcess.child(node);

      if (!_node) {
        node.$children.forEach(function (c) {
          _node = _prcess.child(c);

          if (!_node) {
            _node = _prcess.descendant(c);
          }
        });
      }

      return _node;
    }
  };

  var ret = _prcess[type](node);

  if (isArray) {
    if (type === 'parent' || type === 'ancestor') return [ret];
    return nodes;
  }

  return ret;
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

function compatibleLifetime(options) {
  var _life = {};

  if (options && options.lifetimes) {
    _life = options.lifetimes;
  } else if (options) {
    _life = options;
  }

  return _life;
}

function collectObserver(observerObj, option, ctx) {
  Object.keys(option).forEach(function (prop) {
    if (_typeof(option[prop]) !== 'object' || !option[prop]) return false;

    if (option[prop].observer) {
      if (typeof option[prop].observer === 'string') {
        observerObj[prop] = ctx.methods[option[prop].observer];
      } else {
        observerObj[prop] = option[prop].observer;
      }
    }
  });
  return observerObj;
}

function collectObservers(observersObj, options, param) {
  var self = this;

  var _loop = function _loop(key) {
    var keyArr = key.split(",");
    var arr = [];
    keyArr.forEach(function (its) {
      its = its.trim();
      arr.push(self.data[its]);
    });
    keyArr.forEach(function (its) {
      its = its.trim();
      observersObj[its] = Object.create(null);
      observersObj[its].fn = options.observers[key];
      observersObj[its].arr = arr;
    });
  };

  for (var key in options.observers) {
    _loop(key);
  }

  observersHandle(observersObj, param, self);
}

function processObservers(observersObj, options, param) {
  if (options.observers) {
    collectObservers.call(this, observersObj, options, param);
  }
}

function processInit() {
  getUrl();
  this._currentEvent = {};
}

function processTriggerEvent() {
  this.triggerEvent = function (event) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var e = this._currentEvent;
    var eventType = event[0].toLowerCase() + event.substring(1);
    event = 'on' + event[0].toUpperCase() + event.substring(1);
    e.type = eventType;
    e = processDataSet(e, this.props);
    event = event.replace(/-\w+/, function (name) {
      name = name[1].toUpperCase() + name.substring(2);
      return name;
    });

    if (typeof this.props[event] === 'function') {
      if (e) {
        e.detail = e.detail || {};

        if (Array.isArray(data)) {
          e.detail = data;
        } else if (_typeof(data) === 'object') {
          e.detail = _objectSpread({}, e.detail, {}, data);
        } else {
          e.detail = data;
        }
      }

      this.props[event](e, data, opts);
    }
  };
}

function observerHandle(observerObj, args, that) {
  var isInit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  Object.keys(observerObj).forEach(function (obs) {
    if (isInit && that.props[obs] === undefined) return false;

    if (args[0][obs] !== that.props[obs] && typeof observerObj[obs] === 'function') {
      observerObj[obs].call(that, that.props[obs], args[0][obs]);
    }
  });
}

function observersHandle(observersObj, args, that) {
  Object.keys(observersObj).forEach(function (obs) {
    if (typeof observersObj[obs].fn === 'function' && args[1][obs] !== that.data[obs]) {
      var _observersObj$obs$fn;

      (_observersObj$obs$fn = observersObj[obs].fn).call.apply(_observersObj$obs$fn, [that].concat(_toConsumableArray(observersObj[obs].arr)));
    }
  });
}

function processIntersectionObserver(context) {
  context.createIntersectionObserver = function () {
    var _my;

    return (_my = my).createIntersectionObserver.apply(_my, arguments);
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
    } // processRef(_opts);


    var didMount = function didMount() {
      var _this3 = this;

      _life.error && warnLife("There is no error life cycle", "error");
      _life.move && warnLife("There is no moved life cycle", "moved");
      _life.pageLifetimes && warnLife("There is no page life cycle where the component resides,including(show,hide,resize)", "pageLifetimes");
      this.props.genericSelectable && warnLife("generic:selectable is Unsupported", "generic");

      if (typeof this.triggerEvent !== 'function') {
        processTriggerEvent.call(this);
      } // process relations, get relation ast


      var relationAst = createNode.call(this, null, null, null, null, true).mountedHandles;
      relationAst.push(function () {
        handleRelations.call(_this3);
      });
    };

    fnApp.add('onInit', function () {
      processIntersectionObserver(this);

      this.onPageReady = function (p) {
        _opts.onPageReady && _opts.onPageReady.call(this, p);
      };
    });
    fnApp.add('deriveDataFromProps', function () {});
    fnApp.add('didMount', didMount);
    fnApp.add('onInit', options.created);
    fnApp.insert('onInit', function () {
      this.getRelationNodes = function () {
        return [];
      };

      this.selectComponentApp = new SelectComponent(this);
      this.properties = _objectSpread({}, _opts.properties);
      processInit.call(this, _opts, options, _life, fnApp);
      updateData.call(this);
      processRelations(this, Relations);
      this.selectComponentApp.connect();
      observerHandle(_opts.observerObj, [_opts.props, this.data], this, true);
    });
    fnApp.bind('onInit', _opts);
    fnApp.add('didMount', _opts.attached);
    fnApp.add('didMount', _opts.ready);

    var didUpdate = function didUpdate() {
      for (var _len2 = arguments.length, param = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        param[_key2] = arguments[_key2];
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

function processDataSet(e) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (e.timeStamp === undefined) {
    e = _objectSpread({}, e, {
      target: {
        dataset: {}
      },
      currentTarget: {
        dataset: {}
      }
    });
  }

  Object.keys(props).forEach(function (prop) {
    if (prop.match(/^data-/)) {
      var originProp = prop;
      prop = prop.replace(/[A-Z]/g, function ($) {
        return $.toLowerCase();
      });
      prop = prop.split('-');
      prop.shift();
      prop = prop.join('');
      e.target.dataset[prop] = props[originProp];
      e.currentTarget.dataset[prop] = props[originProp];
    }
  });
  return e;
}

function handleProps() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  opts.props = opts.props || {};

  if (opts.relations) {
    opts.props.theRelations = opts.relations;
  }

  if (!opts.properties) return false;
  Object.keys(opts.properties).forEach(function (prop) {
    var val = opts.properties[prop];

    if (!val) {
      opts.props[prop] = val;
      return false;
    }

    if (typeof val === 'function') {
      var _obj;

      var obj = (_obj = {}, _defineProperty(_obj, Boolean, false), _defineProperty(_obj, String, ''), _defineProperty(_obj, Array, []), _defineProperty(_obj, Object, {}), _obj);
      opts.props[prop] = obj[val];
      return false;
    }

    if (val.hasOwnProperty('value')) {
      opts.props[prop] = val.value;
    } else if (val.type !== 'observer') {
      var _info;

      var info = (_info = {}, _defineProperty(_info, String, ''), _defineProperty(_info, Number, 0), _defineProperty(_info, Object, {}), _defineProperty(_info, null, null), _info);
      opts.props[prop] = info[val.type];
    }
  });
}

function handleData() {
  var otps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
}

function handleExternalClasses() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var arr = opts.externalClasses || [];
  var _class = [];
  arr.forEach(function (a) {
    _class.push(_transform(a) || '');
  });
  opts.data = opts.data || {};
  opts.data.__classNames = _class;
  opts.data.__classes = '';

  function _transform() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    str = str.replace(/-(\w)/g, function () {
      for (var _len3 = arguments.length, $ = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        $[_key3] = arguments[_key3];
      }

      return $[1].toUpperCase();
    });
    return str || '';
  }

  return opts;
}

function handleAfterInit() {
  var _this4 = this;

  var classStr = '';

  this.data.__classNames.forEach(function (key) {
    classStr += _this4.props[key] || '';
  });

  this.setData({
    _classes: classStr
  });
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

function mergeOptions(parent, child) {
  Object.keys(parent).forEach(function (key) {
    var val = parent[key];
    var _val = child[key];
    if (Array.isArray(_val)) return false;
    if (child[key] === undefined) child[key] = parent[key];

    if (_typeof(val) === 'object' && _typeof(_val) === 'object') {
      child[key] = Object.assign({}, _val, val);
    } else if (typeof val === 'function' && typeof _val === 'function') {
      child[key] = function () {
        for (var _len4 = arguments.length, p = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          p[_key4] = arguments[_key4];
        }

        val.apply(this, p);

        _val.apply(this, p);
      };
    }
  });
}