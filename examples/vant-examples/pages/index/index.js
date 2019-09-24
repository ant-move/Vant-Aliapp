import list from "../../config";
Page({
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
