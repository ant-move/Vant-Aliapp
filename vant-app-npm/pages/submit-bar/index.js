import createPage from "vant-aliapp/dist/common/page";
import Toast from "vant-aliapp/dist/dist/toast/toast";
createPage({
    onClickButton() {
        Toast("点击按钮");
    },

    onClickLink() {
        Toast("修改地址");
    }
});
