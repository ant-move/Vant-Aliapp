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

var getUrl = function getUrl() {
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
};

var getLogInfo = function getLogInfo() {
  var num = 0;
  var info = my.getStorageSync({
    key: '__antmove_loginfo'
  }).data.pages;
  info.forEach(function (v, i) {
    num += v.logs.length;
  });
  return num;
};

var watchShakes = function watchShakes() {
  var pages = getCurrentPages();
  var url = pages[pages.length - 1].route;
  var logUrl = "pages/ant-move-runtime-logs/index";
  var specificUrl = "pages/ant-move-runtime-logs/specific/index";
  my.watchShake({
    success: function success() {
      var num = getLogInfo();
      var ifWatch = my.getStorageSync({
        key: 'ifWatch'
      }).data;

      if (!ifWatch || url === logUrl || url === specificUrl || !num) {
        watchShakes();
        return false;
      }

      my.confirm({
        title: '温馨提示',
        content: "\u5DF2\u6536\u96C6\u4E86".concat(num, "\u6761\u95EE\u9898\u65E5\u5FD7\uFF0C\u662F\u5426\u67E5\u770B?  (\u8BE5\u5F39\u7A97\u548C\u95EE\u9898\u6536\u96C6\u9875\u9762\u7684\u4EE3\u7801\u7531Antmove\u5D4C\u5165\uFF0C\u4E0A\u7EBF\u65F6\u8BF7\u8BB0\u5F97\u53BB\u6389)"),
        confirmButtonText: '赶紧看看',
        cancelButtonText: '暂不需要',
        success: function success(res) {
          if (res.confirm) {
            my.navigateTo({
              url: '/pages/ant-move-runtime-logs/index'
            });
          }
        },
        complete: function complete() {
          watchShakes();
        }
      });
    }
  });
};

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
      var ast = this.$node.getRootNode();
      processRelationNodes(ast);

      if (options.onReady) {
        options.onReady.call(this, param);
      }

      ast.isPageReady = true;
    };
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
  ast.mountedHandles.forEach(function (fn, i) {
    fn();
  });
  ast.mountedHandles = [];
}

function processRelations(ctx) {
  var relationInfo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var route = ctx.route;
  route = route.replace(/\/node_modules\/[a-z-]+\/[a-z-]+/, '');
  if (route[0] !== '/') route = '/' + route;
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
        if (!ref) return false;
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