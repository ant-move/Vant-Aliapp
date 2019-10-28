const _tt = require("../../__antmove/api/index.js")(tt);
import createPage from "../../common/page";
createPage({
    onChange(event) {
        _tt.showToast({
            icon: "none",
            title: `切换至第${event.detail}项`
        });
    }
});
