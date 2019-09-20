my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/dist/info/index"
    }
});
import { VantComponent } from "../common/component";
VantComponent({
    props: {
        info: null,
        customStyle: String
    }
});
