const _my = require("../../__antmove/api/index.js")(my);
my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "pages/badge/index"
    }
});
import createPage from "../../common/page";
createPage({
    onChange(event) {
        _my.showToast({
            icon: "none",
            title: `切换至第${event.detail}项`
        });
    }
});
