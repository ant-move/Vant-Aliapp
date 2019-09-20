const _my = require("../../__antmove/api/index.js")(my);
my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "pages/tab/index"
    }
});
import createPage from "../../common/page";
createPage({
    data: {
        tabs: [1, 2, 3, 4],
        tabsMore: [1, 2, 3, 4, 5, 6, 7, 8]
    },

    onClickDisabled(event) {
        _my.showToast({
            title: `标签 ${event.detail.index + 1} 已被禁用`,
            icon: "none"
        });
    },

    onChange(event) {
        _my.showToast({
            title: `切换到标签 ${event.detail.index + 1}`,
            icon: "none"
        });
    },

    onClickNavRight() {
        _my.showToast({
            title: "点击 right nav",
            icon: "none"
        });
    },

    onClick(event) {
        _my.showToast({
            title: `点击标签 ${event.detail.index + 1}`,
            icon: "none"
        });
    }
});
