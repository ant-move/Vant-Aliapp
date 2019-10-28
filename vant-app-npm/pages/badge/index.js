const _my = require("/__antmove/api/index.js")(my);
import createPage from "vant-aliapp/dist/common/page";
createPage({
    onChange(event) {
        _my.showToast({
            icon: "none",
            title: `切换至第${event.detail}项`
        });
    }
});
