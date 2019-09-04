"use strict";

/**
 * type:0 missing
 * type:1 diff
 * 
 */
var appTransformation = require('./classSubdirectory/app');

var pageTransformation = require('./classSubdirectory/page');

var componentTransformation = require('./classSubdirectory/component');

module.exports = function processComponent() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Component';
  var core = {
    App: function (_App) {
      function App() {
        return _App.apply(this, arguments);
      }

      App.toString = function () {
        return _App.toString();
      };

      return App;
    }(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts = {};
      appTransformation.processTransformationApp(_opts, options);
      App(_opts);
    }),
    Page: function (_Page) {
      function Page() {
        return _Page.apply(this, arguments);
      }

      Page.toString = function () {
        return _Page.toString();
      };

      return Page;
    }(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts = {};
      pageTransformation.processTransformationPage(_opts, options);
      Page(_opts);
    }),
    Component: function (_Component) {
      function Component() {
        return _Component.apply(this, arguments);
      }

      Component.toString = function () {
        return _Component.toString();
      };

      return Component;
    }(function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts = {};
      componentTransformation.processTransformationComponent(_opts, options);
      Component(_opts);
    })
  };
  return core[type];
};