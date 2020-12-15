const _my = require("../../__antmove/api/index.js")(my);
const wx = _my;
Component({
    properties: {
        group: Object
    },
    methods: {
        onClick(event) {
            wx.navigateTo({
                url: event.target.dataset.url
            });
        }
    }
});
