const _tt = require("../../__antmove/api/index.js")(tt);
import createPage from "../../common/page";
createPage({
    onClickLeft() {
        _tt.showToast({
            title: "点击返回",
            icon: "none"
        });
    },

    onClickRight() {
        _tt.showToast({
            title: "点击按钮",
            icon: "none"
        });
    }
});
