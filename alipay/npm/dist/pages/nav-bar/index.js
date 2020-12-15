const _my = require("../../__antmove/api/index.js")(my);
const wx = _my;
import Page from "../../common/page";
Page({
    onClickLeft() {
        wx.showToast({
            title: "点击返回",
            icon: "none"
        });
    },

    onClickRight() {
        wx.showToast({
            title: "点击按钮",
            icon: "none"
        });
    }
});
