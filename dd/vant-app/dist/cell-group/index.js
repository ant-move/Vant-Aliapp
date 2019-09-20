my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/dist/cell-group/index"
    }
});
import { VantComponent } from "../common/component";
VantComponent({
    props: {
        title: String,
        border: {
            type: Boolean,
            value: true
        }
    }
});
