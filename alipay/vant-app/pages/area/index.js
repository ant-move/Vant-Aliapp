import Page from "../../common/page";
import Toast from "vant-aliapp/dist/dist/toast/toast";
import database from "../../database_area";
let db;
Page({
    data: {
        areaList: {},
        loading: true,
        value: 330302
    },

    onShow() {
        this.setData({
            loading: false,
            areaList: database
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
