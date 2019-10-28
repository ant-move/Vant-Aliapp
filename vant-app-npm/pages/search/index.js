const _my = require("/__antmove/api/index.js")(my);
import createPage from "vant-aliapp/dist/common/page";
createPage({
    data: {
        value: ""
    },

    onChange(e) {
        this.setData({
            value: e.detail
        });
    },

    onSearch(event) {
        if (this.data.value) {
            _my.showToast({
                title: "搜索：" + this.data.value,
                icon: "none"
            });
        }
    },

    onCancel() {
        _my.showToast({
            title: "取消",
            icon: "none"
        });
    },

    onClear() {
        _my.showToast({
            title: "清空",
            icon: "none"
        });
    }
});
