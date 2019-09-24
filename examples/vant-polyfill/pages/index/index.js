const CreatePage = require("../../$polyfill/component/componentClass.js")(
    "Page"
);
import list from "../../config";
CreatePage({
    data: {
        list,
        activeName: []
    },

    onChangeCollapse(event) {
        this.setData({
            activeNames: event.detail
        });
    },

    onClick(event) {
        const { switchTab, url } = event.currentTarget.dataset;

        if (switchTab) {
            my.switchTab({
                url
            });
        }
    }
});
