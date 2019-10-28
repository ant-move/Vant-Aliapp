import createPage from "vant-aliapp/dist/common/page";
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
