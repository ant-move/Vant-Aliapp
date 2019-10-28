const _tt = require("../../__antmove/api/index.js")(tt);
import createPage from "../../common/page";
createPage({
    data: {
        currentValue: 50
    },

    onChange(event) {
        _tt.showToast({
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
