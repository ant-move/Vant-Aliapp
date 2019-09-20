my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/pages/switch-cell/index"
    }
});
import createPage from "../../common/page";
createPage({
    data: {
        checked: true
    },

    onChange(event) {
        this.setData({
            checked: event.detail
        });
    }
});
