const utils = require('../../api/utils');
const globalVar = require('../../api/config').global;
const { warnLife } = utils;
const { setIfWatch, getUrl } = require('./utils');

module.exports = {
    processTransformationApp (_opts, options) {
        _opts = Object.assign(_opts, options);
        _opts.onLaunch = function (res) {
            globalVar.clearStorageSync({
                key: "logInfo"
            });
            globalVar.clearStorageSync({
                key: "_pageMsg"
            });
            getUrl ();            
            let body = {};
            function pre (params = {}) {
                return utils.defineGetter(params, body.params, function (obj, prop) {
                    warnLife(`onLaunch's return value is not support ${prop} attribute!`, `onLaunch/${prop}`);
                });
            }
            if (options.onLaunch) {
                body = {
                    params: {
                        scene: {
                            type: 0,
                            desc: "missing"
                        },
                        shareTicket: {
                            type: 0,
                            desc: "missing"
                        }
                    }
                };
                res = pre(res);

                if (typeof options.data === 'function') {
                    options.data = options.data();
                }

                options.onLaunch.call(this, res);
            }
            if (options.onPageNotFound) {
                warnLife(`There is no onPageNotFound life cycle`, "onPageNotFound");
    
            }
            if (options.onPageNotFound) {
                warnLife(`There is no onPageNotFound life cycle`,"onPageNotFound");
    
            }
        };
        _opts.onShow = function (res) {
            setIfWatch(true);
            let body = {};
            function pre (params = {}) {
                return utils.defineGetter(params, body.params, function (obj, prop) {
                    warnLife(`onShow's return value is not support ${prop} attribute!`, `onShow/${prop}`);
                });
            }
            if (options.onShow) {
                body = {
                    params: {
                        scene: {
                            type: 0,
                            desc: "missing"
                        },
                        shareTicket: {
                            type: 0,
                            desc: "missing"
                        }
                    }
                };
                res = pre(res);
                options.onShow.call(this, res);
            }
        };
        _opts.onHide = function () {
            setIfWatch(false);
            if (options.onHide) {
                warnLife('', 'app/onHide');
                options.onHide.call(this);
            }
        }
        if (options.onError) {
            _opts.onError =function () {
                options.onError.call(this);
            };
        }
    }
};