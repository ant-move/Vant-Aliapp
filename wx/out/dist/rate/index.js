import { VantComponent } from "../common/component";
VantComponent({
    field: true,
    classes: ["icon-class"],
    props: {
        childName: String,
        value: Number,
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: {
            type: Number,
            value: 20
        },
        icon: {
            type: String,
            value: "star"
        },
        voidIcon: {
            type: String,
            value: "star-o"
        },
        color: {
            type: String,
            value: "#ffd21e"
        },
        voidColor: {
            type: String,
            value: "#c7c7c7"
        },
        disabledColor: {
            type: String,
            value: "#bdbdbd"
        },
        count: {
            type: Number,
            value: 5
        }
    },
    data: {
        innerValue: 0
    },
    watch: {
        value(value) {
            if (value !== this.data.innerValue) {
                this.set({
                    innerValue: value
                });
            }
        }
    },
    methods: {
        onSelect(event) {
            const { data } = this;
            const { score } = event.currentTarget.dataset;

            if (!data.disabled && !data.readonly) {
                this.set({
                    innerValue: score + 1
                });
                this.$emit("input", score + 1);
                this.$emit("change", score + 1);
            }
        },

        onTouchMove(event) {
            const { clientX, clientY } = event.touches[0];
            let childName = "";

            if (this.props) {
                childName = "." + this.props.childName;
            } else {
                childName = "." + this.properties.childName;
            }

            let nodes = this.selectAllComponents(childName);
            this.getRect(childName, true).then(list => {
                if (nodes[0] && nodes[0]["props"]) {
                    list.map((item, index) => {
                        item["dataset"] = {};
                        item["dataset"]["score"] =
                            nodes[index].props["data-score"];
                    });
                }

                const target = list
                    .sort(item => item.right - item.left)
                    .find(
                        item =>
                            clientX >= item.left &&
                            clientX <= item.right &&
                            clientY >= item.top &&
                            clientY <= item.bottom
                    );

                if (target != null) {
                    this.onSelect(
                        Object.assign({}, event, {
                            currentTarget: target
                        })
                    );
                }
            });
        }
    }
});
