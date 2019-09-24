const _my = require("../../dist/__antmove/api/index.js")(my);
import Toast from "../../dist/dist/toast/toast";
Page({
    data: {
        areaList: {},
        loading: true,
        value: 330302
    },

    onShow() {
        _my.request({
            url:
                "https://cashier.youzan.com/wsctrade/uic/address/getAllRegion.json",
            success: response => {
                this.setData({
                    loading: false,
                    areaList: response.data.data
                });
            }
        });
    },

    onChange(event) {
        const { values } = event.detail;
        Toast(values.map(item => item.name).join("-"));
    },

    onConfirm(event) {
        console.log(event);
    },

    onCancel(event) {
        console.log(event);
    }
});
