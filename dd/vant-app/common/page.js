const _Page = require("/__antmove/component/componentClass.js")("Page");
export default function(options = {}) {
    return _Page({
        onShareAppMessage() {
            return {
                title: "Vant Weapp 组件库演示"
            };
        },

        ...options
    });
}
