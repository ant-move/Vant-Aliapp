"use strict";

var utils = require('../../api/utils');

var warnLife = utils.warnLife;

var config = require('../../api/config');

var createNode = require('./relation');

var Relations = require('../../api/relations');

var processRelationHandle = require('./processRelation');

var _require = require('./utils'),
    connectNodes = _require.connectNodes;

var selectComponent = require('./selectComponent');

var _require2 = require('../utils'),
    watchShakes = _require2.watchShakes,
    getUrl = _require2.getUrl;

module.exports = {
  processTransformationPage: function processTransformationPage(_opts, options) {
    _opts = Object.assign(_opts, options);

    _opts.onLoad = function (res) {
      this.selectComponentApp = new selectComponent(this);
      this.selectComponentApp.connect(); // 初始化节点树

      createNode.call(this, null, null, null, true);
      processRelations(this, Relations);

      if (typeof options.data === 'function') {
        options.data = options.data();
      }

      getUrl();

      if (config.env === "development") {
        watchShakes();
      }

      if (options.onResize) {
        warnLife("There is no onResize life cycle", "onResize");
      }

      if (options.onLoad) {
        options.onLoad.call(this, res);
      }
    };

    _opts.onReady = function (param) {
      /**
       * for child ref
       * 
       * 当父级组件挂载后再执行父级组件传递下来的属性回调函数
       */
      this.setData({
        isMounted: true
      });

      if (options.onReady) {
        options.onReady.call(this, param);
      }
    };
  }
};

function processRelationNodes() {
  var ast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var $nodes = ast.$nodes;
  setTimeout(function () {
    ast.mountedHandles.forEach(function (fn, i) {
      fn();
    });
    ast.mountedHandles = [];
  }, 500);
}

function processRelations(ctx) {
  var relationInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var relationApp = {
    fns: [],
    relationFns: []
  };
  var route = ctx.route;
  route = route.replace(/\/node_modules\/[a-z-]+\/[a-z-]+/, '');
  if (route[0] !== '/') route = '/' + route;
  var info = relationInfo[route] || relationInfo[route.substring(1)];

  if (info) {
    processRelationHandle(info, function (node) {
      var id = node.$id;
      ctx.$antmove = ctx.$antmove || {};
      ctx.$antmove.__refFns = ctx.$antmove.__refFns || {};
      ctx.$antmove.__refFns[node.$id] = false;

      if (id === 'saveChildRef0') {
        ctx.$antmove.__refFns[id] = true;

        ctx[id] = function () {
          var _this = this;

          node.$index = 0;
          node.$route = route;
          this.$id = this.$id || this.$viewId;
          createNode.call(this, this, null, node);
          relationApp.fns.forEach(function (fn) {
            fn.call(_this);
          });
          var _arr = [];
          relationApp.relationFns.forEach(function (fn) {
            if (!fn.call(_this)) {
              _arr.push(fn);
            }
          });
          relationApp.relationFns = _arr;
          var ast = this.$rootNode.getRootNode();
          processRelationNodes(ast);
          ast.isPageReady = true;
        };

        return false;
      }

      ctx[id] = function (ref) {
        if (!ref) return false;

        if (!ctx.$antmove.__refFns[ref.$id]) {
          ctx.$antmove.__refFns[ref.$id] = true;
          relationApp.fns.unshift(function () {
            var ctx = this;
            ctx.selectComponentApp.preProcesscomponents(ref);
            ctx.$antmove = ctx.$antmove || {};

            if (ctx.$antmove[id] === undefined) {
              ctx.$antmove[id] = 0;
            } else {
              ctx.$antmove[id] += 1;
            }

            node.$index = ctx.$antmove[id];
            node.$route = route;
            createNode.call(ctx, ref, null, node);
          });
          relationApp.relationFns.push(function () {
            return ref.handleRelations && ref.handleRelations();
          });
        }

        if (ctx.saveChildRef0) {
          ctx.saveChildRef0();
        }
      };
    });
  } else {
    console.warn('Missing nodes relation of ', route);
  }
}