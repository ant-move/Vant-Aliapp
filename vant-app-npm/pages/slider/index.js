const _my = require("/__antmove/api/index.js")(my);
import createPage from "vant-aliapp/dist/common/page";
createPage({
    data: {
        currentValue: 50
    },

    onChange(event) {
        _my.showToast({
            icon: "none",
            title: `当前值：${event.detail}`
        });
    },

    onDrag(event) {
        this.setData({
            currentValue: event.detail.value
        });
    }
});
