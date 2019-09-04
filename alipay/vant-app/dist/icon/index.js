import { VantComponent } from "../common/component";
VantComponent({
    props: {
        info: null,
        name: String,
        size: String,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: "van-icon"
        }
    },
    methods: {
        onClick() {
            this.$emit("tap");

            if (this.props && this.props.onTouchstart) {
                this.props.onTouchstart();
            }
        }
    }
});
