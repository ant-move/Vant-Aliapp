const _tt = require("../../__antmove/api/index.js")(tt);
import createPage from "../../common/page";
import Toast from "../../dist/toast/toast";
createPage({
    data: {
        areaList: {},
        loading: true,
        value: 330302
    },

    onShow() {
        _tt.request({
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
