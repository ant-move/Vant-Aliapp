const _my = require("/__antmove/api/index.js")(my);
my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/pages/notify/index"
    }
});
import createPage from "../../common/page";
import Notify from "../../dist/notify/notify";
createPage({
    showNotify() {
        Notify("通知内容");
    },

    showNotify2() {
        Notify({
            duration: 1000,
            text: "通知内容",
            selector: ".custom-selector",
            backgroundColor: "#1989fa",
            safeAreaInsetTop: true
        });
    },

    onClickLeft() {
        _my.navigateBack();
    }
});
