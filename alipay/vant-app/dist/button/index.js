const _my = require("../../__antmove/api/index.js")(my);
import { VantComponent } from "../common/component";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
VantComponent({
    mixins: [button, openType],
    classes: ["hover-class", "loading-class", "my-class"],
    props: {
        icon: String,
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        type: {
            type: String,
            value: "default"
        },
        size: {
            type: String,
            value: "normal"
        },
        loadingSize: {
            type: String,
            value: "20px"
        }
    },
    methods: {
        onClick(e) {
            if (!this.data.disabled && !this.data.loading) {
                this.$emit("click");
            }

            if (this.props && this.props.onTap) {
                this.props.onTap(e);
            }
        }
    }
});
