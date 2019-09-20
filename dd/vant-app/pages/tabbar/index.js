my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/pages/tabbar/index"
    }
});
import createPage from "../../common/page";
createPage({
    data: {
        active: 0,
        active2: "home",
        active3: 0
    },

    onShow() {
        // this.getTabBar().init();
    },

    onChange(event) {
        const { key } = event.currentTarget.dataset;
        this.setData({
            [key]: event.detail
        });
    }
});
