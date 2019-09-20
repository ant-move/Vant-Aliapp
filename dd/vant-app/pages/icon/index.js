my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/pages/icon/index"
    }
});
import icons from "../../dist/_vant/icons/src/config";
import createPage from "../../common/page";
createPage({
    data: {
        icons,
        active: 0
    },

    onSwitch(event) {}
});
