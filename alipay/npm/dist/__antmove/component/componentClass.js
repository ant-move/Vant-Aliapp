"use strict";

/**
 * type:0 missing
 * type:1 diff
 * 
 */
var appTransformation = require('./classSubdirectory/app');

var pageTransformation = require('./classSubdirectory/page');

var componentTransformation = require('./classSubdirectory/component');

var originApp = App;
var originPage = Page;
var originComponent = Component;

App = function App() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _opts = {};
  appTransformation.processTransformationApp(_opts, options);
  originApp(_opts);
};

Page = function Page() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _opts = {};
  pageTransformation.processTransformationPage(_opts, options);
  originPage(_opts);
};

Component = function Component() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _opts = {};
  componentTransformation.processTransformationComponent(_opts, options);
  originComponent(_opts);
};