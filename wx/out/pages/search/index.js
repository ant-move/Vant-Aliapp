const _tt = require("../../__antmove/api/index.js")(tt);
import createPage from "../../common/page";
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
            _tt.showToast({
                title: "搜索：" + this.data.value,
                icon: "none"
            });
        }
    },

    onCancel() {
        _tt.showToast({
            title: "取消",
            icon: "none"
        });
    },

    onClear() {
        _tt.showToast({
            title: "清空",
            icon: "none"
        });
    }
});
