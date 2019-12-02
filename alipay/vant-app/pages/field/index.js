const _my = require("../../__antmove/api/index.js")(my);
import createPage from "../../common/page";
createPage({
    data: {
        sms: "",
        value: "",
        password: "",
        username: "",
        username2: "",
        message: "",
        phone: "1365577"
    },

    onClickIcon() {
        _my.showToast({
            icon: "none",
            title: "点击图标"
        });
    },

    onFieldChange({ detail }) {
        console.log("change", detail);
        this.setData({
            sms: detail
        });
    },

    onFieldBlur({ detail }) {
        console.log("blur", detail);
    },

    onSendSms() {
        console.log("onSendSms", this.data.sms);
    }
});
