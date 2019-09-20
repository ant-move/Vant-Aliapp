my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/pages/stepper/index"
    }
});
import createPage from "../../common/page";
import Toast from "../../dist/toast/toast";
createPage({
    onChange(event) {
        Toast(`change: ${event.detail}`);
    }
});
