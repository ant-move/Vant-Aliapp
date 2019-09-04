const _my = require("/__antmove/api/index.js")(my);
import createPage from "../../common/page";
createPage({
    onClickLeft() {
        _my.showToast({
            title: "点击返回",
            icon: "none"
        });
    },

    onClickRight() {
        _my.showToast({
            title: "点击按钮",
            icon: "none"
        });
    }
});
