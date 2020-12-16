import Page from "../../common/page";
import Notify from "vant-aliapp/dist/dist/notify/notify";
Page({
    onChange(event) {
        Notify({
            type: "primary",
            message: `切换至第${event.detail}项`
        });
    }
});
