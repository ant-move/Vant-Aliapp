my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/dist/loading/index"
    }
});
import { VantComponent } from "../common/component";
VantComponent({
    props: {
        size: {
            type: String,
            value: "30px"
        },
        type: {
            type: String,
            value: "circular"
        },
        color: {
            type: String,
            value: "#c9c9c9"
        }
    }
});
