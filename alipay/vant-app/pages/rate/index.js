import createPage from "../../common/page";
createPage({
    data: {
        value1: 3,
        value2: 3,
        value3: 3,
        value4: 2.5,
        value5: 4,
        value6: 3
    },

    onChange(event) {
        const { key } = event.currentTarget.dataset;
        this.setData({
            [key]: event.detail
        });
    }
});
