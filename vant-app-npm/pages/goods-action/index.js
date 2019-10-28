import createPage from "vant-aliapp/dist/common/page";
import Toast from "vant-aliapp/dist/dist/toast/toast";
createPage({
    onClickIcon() {
        // wx.showToast({ title: '点击图标', icon: 'none' });
        Toast("点击图标");
    },

    onClickButton() {
        //wx.showToast({ title: '点击按钮', icon: 'none' });
        Toast("点击按钮");
    }
});
