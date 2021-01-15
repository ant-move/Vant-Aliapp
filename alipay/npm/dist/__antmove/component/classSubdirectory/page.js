"use strict";

var config = require('../../api/config');

var Relations = require('../../api/relations');

var _require = require('../utils'),
    watchShakes = _require.watchShakes,
    getUrl = _require.getUrl;

var createNode = require('./relation');

var processRelationHandle = require('./processRelation');

var _require2 = require('./utils'),
    connectNodes = _require2.connectNodes,
    antmoveAction = _require2.antmoveAction;

var SelectComponent = require('./selectComponent');

module.exports = {
  processTransformationPage: function processTransformationPage(_opts, options) {
    _opts = Object.assign(_opts, options);

    _opts.onLoad = function (res) {
      this.selectComponentApp = new SelectComponent(this);
      this.selectComponentApp.connect(); // 初始化节点树

      createNode.call(this, null, null, null, true);
      processRelations(this, Relations);

      if (typeof options.data === 'function') {
        options.data = options.data();
      }

      getUrl();

      this.createSelectorQuery = function () {
        return my.createSelectorQuery();
      };

      if (options.onLoad) {
        options.onLoad.call(this, res);
      }
    };

    _opts.onReady = function (param) {
      var ast = null;

      if (this.$node) {
        ast = this.$node.getRootNode();
      }

      ast && processRelationNodes(ast);

      if (options.onReady) {
        options.onReady.call(this, param);
      }

      if (ast) {
        ast.isPageReady = true;
      }
    };

    _opts.onShow = function (param) {
      if (config.env === 'development' && config.useRuntimeLog) {
        watchShakes();
      }

      if (options.onShow) {
        options.onShow.call(this, param);
      }
    };

    if (options.onResize) {
      _opts.events = options.events || {};

      _opts.events.onResize = function (e) {
        var _e = e,
            size = _e.size;
        var windowHeight = size.windowHeight,
            windowWidth = size.windowWidth;
        var deviceOrientation = 'landscape';
        var resizeObj = {};

        if (windowHeight > windowWidth) {
          deviceOrientation = 'portrait';
        }

        var _my$getSystemInfoSync = my.getSystemInfoSync(),
            screenWidth = _my$getSystemInfoSync.screenWidth,
            screenHeight = _my$getSystemInfoSync.screenHeight;

        size.screenWidth = screenWidth;
        size.screenHeight = screenHeight;
        resizeObj = {
          deviceOrientation: deviceOrientation,
          size: size
        };
        /**
                * 组件所在的页面尺寸变化时执行
                */

        if (this.$node && Array.isArray(this.$node.$children)) {
          this.$node.$children.forEach(function (c) {
            if (c.$self.antmovePageLifetimes) {
              c.$self.antmovePageLifetimes(e = resizeObj);
            }
          });
        }

        options.onResize(e = resizeObj);
      };
    }

    _opts.antmoveAction = antmoveAction;
  }
};

function processRelationNodes() {
  var ast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var $nodes = ast.$nodes;
  /**
     * componentNodes onPageReady
     */

  Object.keys($nodes).forEach(function (item) {
    var node = $nodes[item];
    connectNodes(node, ast);

    if (node.$self && typeof node.$self.onPageReady === 'function') {
      node.$self.onPageReady();
    }
  });
  ast.mountedHandles.forEach(function (fn) {
    fn();
  });
  ast.mountedHandles = [];
}

function processRelations(ctx) {
  var relationInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var route = ctx.route;
  route = route.replace(/\/node_modules\/[a-z-]+\/[a-z-]+/, '');

  if (route[0] !== '/') {
    route = "/".concat(route);
  }

  var info = relationInfo[route] || relationInfo[route.substring(1)];

  if (info) {
    processRelationHandle(info, function (node) {
      var id = node.$id;

      if (id === 'saveChildRef0') {
        ctx[id] = function () {};

        node.$index = 0;
        node.$route = route;
        createNode.call(ctx, ctx, null, node);
        return false;
      }

      ctx[id] = function (ref) {
        if (!ref) {
          return false;
        }

        ctx.$antmove = ctx.$antmove || {};

        if (ctx.$antmove[id] === undefined) {
          ctx.$antmove[id] = 0;
        } else {
          ctx.$antmove[id] += 1;
        }

        ctx.selectComponentApp.preProcesscomponents(ref);
        node.$index = ctx.$antmove[id];
        node.$route = route;
        createNode.call(ctx, ref, null, node);
      };
    });
  } else {
    console.warn('Missing nodes relation of ', route);
  }
}