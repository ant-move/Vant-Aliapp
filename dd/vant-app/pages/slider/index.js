const _my = require("../../__antmove/api/index.js")(my);
my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "pages/slider/index"
    }
});
import createPage from "../../common/page";
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
