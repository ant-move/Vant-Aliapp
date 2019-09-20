my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/dist/progress/index"
    }
});
import { VantComponent } from "../common/component";
import { BLUE } from "../common/color";
VantComponent({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        showPivot: {
            type: Boolean,
            value: true
        },
        color: {
            type: String,
            value: BLUE
        },
        textColor: {
            type: String,
            value: "#fff"
        }
    }
});
