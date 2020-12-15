const _my = require("../../__antmove/api/index.js")(my);
const wx = _my;
import { VantComponent } from "../common/component";
VantComponent({
    relation: {
        type: "descendant",
        name: "goods-action-button",
        current: "goods-action",

        linked() {
            this.updateStyle();
        },

        unlinked() {
            this.updateStyle();
        },

        linkChanged() {
            this.updateStyle();
        }
    },
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        updateStyle() {
            wx.nextTick(() => {
                this.children.forEach(child => {
                    child.updateStyle();
                });
            });
        }
    }
});
