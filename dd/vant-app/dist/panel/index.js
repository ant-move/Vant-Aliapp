my.setStorageSync({
    key: "activeComponent",
    data: {
        is: "/dist/panel/index"
    }
});
import { VantComponent } from "../common/component";
VantComponent({
    classes: ["header-class", "footer-class"],
    props: {
        desc: String,
        title: String,
        status: String,
        useFooterSlot: Boolean
    }
});
